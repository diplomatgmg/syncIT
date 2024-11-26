import logging
import os
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from typing import Any
from urllib.parse import urlencode

import requests

from apps.profession.models import Profession
from apps.vacancy.models import ParsedVacancy, Vacancy
from helpers.utils import (
    clear_html,
    generate_hash,
    normalize_currency,
    timeit,
    normalize_grade,
    normalize_hard_skill,
    normalize_profession,
)
from parsers.base_parser import BaseParser
from parsers.open_ai.chat_gpt import get_chat_gpt_completion
from parsers.open_ai.prompt import make_prompt
from parsers.open_ai.utils import parse_vacancy

logger = logging.getLogger(__name__)


class HHParser(BaseParser):
    base_url = "https://api.hh.ru/vacancies"
    vacancies_per_page = 100  # Максимальной кол-во вакансий на странице
    vacancies_period = 3  # Показывать вакансии только за последние сутки
    session = requests.Session()
    headers = None

    def __init__(self, *args, **kwargs):
        self.headers = self._create_headers()
        super().__init__(*args, **kwargs)

    @staticmethod
    def _create_headers() -> dict[str, str]:
        access_token = os.getenv("HH_ACCESS_TOKEN")
        email = os.getenv("HH_EMAIL")
        app_name = os.getenv("HH_APP_NAME")

        return {
            "Authorization": f"Bearer {access_token}",
            "User-Agent": f"{app_name} ({email})",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    @staticmethod
    def _join_url_params(*params) -> str:
        return " OR ".join(params)

    def _build_parse_url(self, page=0) -> str:
        profession_names = Profession.objects.exclude(name="Неизвестно").values_list(
            "name", flat=True
        )
        text = self._join_url_params(*profession_names)

        params = {
            "text": text,
            "per_page": self.vacancies_per_page,
            "period": self.vacancies_period,
            "page": page,
        }

        return f"{self.base_url}?{urlencode(params)}"

    def _build_vacancy_detail_url(self, url: str) -> str:
        return f"{self.base_url}/{url}"

    def _get_http_data(self, url: str, **kwargs) -> dict[str, Any]:
        for _ in range(10):
            try:
                response = self.session.get(url, headers=self.headers, **kwargs)
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException:
                time.sleep(2)

    @staticmethod
    def get_data_with_workers(callback, collection, timeout=10, max_workers=10):
        result = []

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_data = {
                executor.submit(callback, item): item for item in collection
            }
            for count, future in enumerate(future_to_data):
                data = None
                while data is None:
                    try:
                        data = future.result(timeout=timeout)
                    except TimeoutError:
                        logger.error(
                            f"TimeoutError. Повторная попытка получить данные..."
                        )
                        pass

                result.append(data)

        return result

    def get_vacancies_ids_from_pages(self, page_count: int) -> set[str]:
        vacancies_ids = set()
        # Range от 0 до len(page_count - 1). Документация api.hh
        page_urls = [self._build_parse_url(page=page) for page in range(page_count)]
        pages_data = self.get_data_with_workers(self._get_http_data, page_urls)

        for data in pages_data:
            vacancies = data.get("items")

            for vacancy in vacancies:
                vacancy_id: str = vacancy.get("id")
                vacancies_ids.add(vacancy_id)

        return vacancies_ids

    def get_last_vacancies_ids(self) -> set[str]:
        url = self._build_parse_url()
        http_data = self._get_http_data(url)

        pages: int = http_data["pages"]
        vacancies_ids = self.get_vacancies_ids_from_pages(pages)
        vacancies_hashes = {
            generate_hash(vacancy_id): vacancy_id for vacancy_id in vacancies_ids
        }

        existing_hashes = set(
            ParsedVacancy.objects.filter(
                unique_hash__in=vacancies_hashes.keys()
            ).values_list("unique_hash", flat=True)
        ) | set(
            Vacancy.objects.filter(unique_hash__in=vacancies_hashes.keys()).values_list(
                "unique_hash", flat=True
            )
        )

        return {
            vacancy_id
            for vacancy_hash, vacancy_id in vacancies_hashes.items()
            if vacancy_hash not in existing_hashes
        }

    def get_vacancies_data(self, vacancies_ids: set[str]) -> list[dict[str, Any]]:
        vacancies_urls = [
            self._build_vacancy_detail_url(vacancy_id) for vacancy_id in vacancies_ids
        ]

        return self.get_data_with_workers(self._get_http_data, vacancies_urls)

    @staticmethod
    def get_prompted_vacancy(vacancy_data: dict[str, Any]) -> str:
        name = vacancy_data["name"]

        description = clear_html(vacancy_data["description"])
        skills = ", ".join(skill["name"] for skill in vacancy_data["key_skills"])

        experience = vacancy_data["experience"]["name"]

        prompt = make_prompt(
            name=name,
            description=description,
            skills=skills,
            experience=experience,
        )

        return prompt

    def get_vacancies_gpt_responses(self, vacancies_prompts):
        for prompt in vacancies_prompts:
            # Получаем 3 ответа от ChatGPT для максимального сбора инфы
            vacancy_response = self.get_data_with_workers(
                get_chat_gpt_completion, [prompt] * 3, timeout=10
            )

            yield vacancy_response

    @staticmethod
    def parse_gpt_responses(gpt_responses):
        data = tuple(filter(lambda x: x is not None, map(parse_vacancy, gpt_responses)))

        grades = [item["grade_name"] for item in data]
        grade = max(set(grades), key=grades.count) if grades else "Неизвестно"
        # Получаем самый частый грейд на основе ответов chatGPT. Аналогично дальше

        professions = [item["profession"] for item in data]
        profession = (
            max(set(professions), key=professions.count)
            if professions
            else "Неизвестно"
        )

        hard_skills = set()
        for item in data:
            hard_skill_names = item["hard_skill_names"]
            normalized_hard_skills = filter(
                lambda x: x, map(normalize_hard_skill, hard_skill_names)
            )
            hard_skills.update(normalized_hard_skills)

        work_formats = set()
        for item in data:
            work_formats.update(item["work_format_names"])

        description = [item["description"] for item in data]
        description = (
            max(set(description), key=description.count) if description else ""
        )

        return {
            "grade_name": normalize_grade(grade),
            "hard_skill_names": tuple(hard_skills),
            "work_format_names": tuple(work_formats),
            "profession_name": normalize_profession(profession),
            "description": description,
        }

    @staticmethod
    def get_vacancy_result(vacancy_data, parsed_vacancy):
        salary = vacancy_data["salary"]
        if salary:
            salary_from = salary["from"]
            salary_to = salary["to"]
        else:
            salary_from = None
            salary_to = None

        # FIXME: Django ругается, что нет адаптации с локальным временем
        #  Мб надо поправить, но это не критично
        published_at_str = vacancy_data["published_at"]
        published_at = datetime.strptime(published_at_str, "%Y-%m-%dT%H:%M:%S%z")

        return {
            "unique_hash": generate_hash(vacancy_data["id"]),
            "name": vacancy_data["name"],
            "salary_from": salary_from,
            "salary_to": salary_to,
            "currency": normalize_currency(salary["currency"]) if salary else None,
            "experience": vacancy_data["experience"]["name"],
            "url": vacancy_data["alternate_url"],
            "company_name": vacancy_data["employer"]["name"],
            "published_at": published_at,
            **parsed_vacancy,
        }

    @timeit
    def start(self):
        last_vacancies_ids = self.get_last_vacancies_ids()
        vacancies_data = self.get_vacancies_data(last_vacancies_ids)
        vacancies_prompts = [
            self.get_prompted_vacancy(vacancy_data) for vacancy_data in vacancies_data
        ]

        vacancies_gpt_responses = zip(
            vacancies_data,
            self.get_vacancies_gpt_responses(vacancies_prompts),
        )

        for vacancy_number, (vacancy_data, gpt_responses) in enumerate(
            vacancies_gpt_responses, start=1
        ):
            logger.info(f"Парсим вакансию {vacancy_number} из {len(vacancies_data)}")
            parsed_vacancy = self.parse_gpt_responses(gpt_responses)
            ParsedVacancy.objects.get_or_create(
                unique_hash=generate_hash(vacancy_data["id"]),
                name=vacancy_data["name"],
                url=vacancy_data["alternate_url"],
            )

            vacancy_skills = parsed_vacancy["hard_skill_names"]
            if len(vacancy_skills) < 4:
                vacancy_url = vacancy_data["alternate_url"]
                logger.debug(
                    f"Пропустили вакансию {vacancy_url} - мало скиллов. {vacancy_skills}"
                )
                continue

            vacancy_result = self.get_vacancy_result(vacancy_data, parsed_vacancy)
            self.save_vacancy_to_db(vacancy_result)
