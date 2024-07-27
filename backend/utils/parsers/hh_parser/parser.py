import os
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from typing import Any
from urllib.parse import urlencode

import requests

from apps.vacancy.models import ParsedVacancy
from utils.helpers import generate_hash, clear_html, timeit
from utils.parsers.base_parser import BaseParser
from utils.parsers.normalize_grade import normalize_grade
from utils.parsers.normalize_hard_skill import normalize_hard_skill
from utils.parsers.normalize_profession import normalize_profession
from utils.parsers.open_ai.chat_gpt import get_chat_gpt_completion
from utils.parsers.open_ai.prompt import make_prompt
from utils.parsers.open_ai.utils import parse_vacancy


class HHParser(BaseParser):
    base_url = "https://api.hh.ru/vacancies"
    vacancies_per_page = 100  # Максимальной кол-во вакансий на странице
    vacancies_period = 3  # Показывать вакансии только за последние сутки
    session = requests.Session()
    headers = None

    def __init__(
        self,
        profile_hard_skills_names: list[str],
        profile_profession_names: list[str],
    ):
        self.profile_hard_skills_names = profile_hard_skills_names
        self.profile_profession_names = profile_profession_names
        self.headers = self._create_headers()
        super().__init__()

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
        text = self._join_url_params(
            *self.profile_profession_names,
            *self.profile_hard_skills_names,
        )

        params = {
            "text": text,
            "per_page": self.vacancies_per_page,
            "period": self.vacancies_period,
            "page": page,
        }

        return f"{self.base_url}?{urlencode(params)}"

    def _build_vacancy_detail_url(self, url: str) -> str:
        return f"{self.base_url}/{url}"

    def _get_http_data(
        self, url: str, **kwargs
    ) -> dict[str, list[Any] | str | int | None]:
        retries = 0
        while retries < 10:
            try:
                response = self.session.get(url, headers=self.headers, **kwargs)
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException:
                retries += 1
                if retries == 5:
                    self.session = requests.Session()
                time.sleep(1)

    @staticmethod
    def get_data_with_workers(callback, collection, timeout=5, max_workers=10):
        result = []

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_data = {
                executor.submit(callback, item): item for item in collection
            }
            for count, future in enumerate(future_to_data):
                print(f"Выполнено future: {count + 1} из {len(collection)}")
                data = None
                while data is None:
                    try:
                        data = future.result(timeout=timeout)
                    except TimeoutError:
                        print(f"Повторная попытка получить данные...")
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
                get_chat_gpt_completion, [prompt] * 3, timeout=3
            )

            yield vacancy_response

    @staticmethod
    def parse_gpt_responses(gpt_responses: list[str]) -> dict[str, tuple]:
        data = tuple(filter(lambda x: x is not None, map(parse_vacancy, gpt_responses)))

        grades = [item["grade_name"] for item in data]
        grade = max(set(grades), key=grades.count) if grades else "Неизвестно"

        professions = [item["profession"] for item in data]
        profession = max(set(professions), key=professions.count)

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

        return {
            "grade_name": normalize_grade(grade),
            "hard_skill_names": tuple(hard_skills),
            "work_format_names": tuple(work_formats),
            "profession_name": normalize_profession(profession),
        }

    @staticmethod
    def get_vacancy_result(vacancy_data, parsed_vacancy):
        if vacancy_data["salary"]:
            salary_from = vacancy_data["salary"]["from"]
            salary_to = vacancy_data["salary"]["to"]
        else:
            salary_from = None
            salary_to = None

        # Django ругается, что нет адаптации с локальным временем
        # Мб надо поправить, но это не критично
        published_at_str = vacancy_data["published_at"]
        published_at = datetime.strptime(published_at_str, "%Y-%m-%dT%H:%M:%S%z")

        return {
            "unique_hash": generate_hash(vacancy_data["id"]),
            "name": vacancy_data["name"],
            "description": vacancy_data["description"],
            "salary_from": salary_from,
            "salary_to": salary_to,
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

        for vacancy_data, gpt_responses in vacancies_gpt_responses:
            parsed_vacancy = self.parse_gpt_responses(gpt_responses)
            ParsedVacancy.objects.get_or_create(
                unique_hash=generate_hash(vacancy_data["id"])
            )

            if len(parsed_vacancy["hard_skill_names"]) < 5:
                continue

            vacancy_result = self.get_vacancy_result(vacancy_data, parsed_vacancy)
            self.save_vacancy_to_db(vacancy_result)
