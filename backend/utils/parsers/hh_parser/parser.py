import json
from datetime import datetime
from urllib.parse import urlencode

import requests
from utils.helpers import generate_hash, clear_html
from utils.parsers.base_parser import BaseParser
from utils.parsers.hh_parser.config import HEADERS
from utils.parsers.open_ai.chat_gpt import get_chat_gpt_completion
from utils.parsers.open_ai.prompt import make_prompt


class HHParser(BaseParser):
    _base_url = "https://api.hh.ru/vacancies"
    _vacancies_per_page = 100
    _vacancies_period = 1  # Показывать вакансии только за последние сутки
    session = None

    def __init__(self):
        super().__init__()
        self.hard_skills = (skill.name for skill in self.get_db_hard_skills())
        self.session = requests.Session()

    def build_parse_url(self):
        normalized_hard_skills = " OR ".join(self.hard_skills)

        params = {
            "text": normalized_hard_skills,
            "per_page": self._vacancies_per_page,
            "period": self._vacancies_period,
        }

        return f"{self._base_url}?{urlencode(params)}"

    def build_vacancy_url(self, vacancy_id):
        return f"{self._base_url}/{vacancy_id}"

    def start(self):
        new_vacancies_ids = tuple(self.get_new_vacancies_ids())

        for vacancy_id in new_vacancies_ids:
            vacancy_url = self.build_vacancy_url(vacancy_id)
            vacancy_data = self.get_http_data(vacancy_url)

            for role in vacancy_data["professional_roles"]:
                if role["id"] not in (
                    "96",
                    "104",
                    "113",
                    "114",
                    "116",
                    "121",
                    "124",
                    "160",
                ):
                    print(
                        "Скипнули вакансию",
                        vacancy_data["name"],
                        role["name"],
                        vacancy_url,
                    )
                    continue

            print("Сохраняем вакансию", vacancy_data["name"], vacancy_url)

            vacancy_prompt = self.get_prompted_vacancy(vacancy_data)

            vacancy_gpt_result = get_chat_gpt_completion(vacancy_prompt)
            parsed_vacancy = self.parse_vacancy(vacancy_gpt_result)

            while parsed_vacancy is None:
                print("=== Повторяю запрос ===")
                vacancy_gpt_result = get_chat_gpt_completion(vacancy_prompt)
                parsed_vacancy = self.parse_vacancy(vacancy_gpt_result)

            if len(parsed_vacancy["hard_skill_names"]) < 5:
                print("Мало скиллов, скипаем")
                continue

            if vacancy_data["salary"]:
                salary_from = vacancy_data["salary"]["from"]
                salary_to = vacancy_data["salary"]["to"]
            else:
                salary_from = None
                salary_to = None

            published_at_str = vacancy_data["published_at"]
            published_at = datetime.strptime(
                published_at_str, "%Y-%m-%dT%H:%M:%S%z"
            )  # TODO Использовать timezone

            try:
                self.save_vacancy_to_db(
                    unique_hash=generate_hash(vacancy_id),
                    name=vacancy_data["name"],
                    description=vacancy_data["description"],
                    salary_from=salary_from,  # TODO зп может быть в другой валюте. поменять
                    salary_to=salary_to,  # TODO зп может быть в другой валюте. поменять
                    experience=vacancy_data["experience"]["name"],
                    url=vacancy_data["alternate_url"],
                    company_name=vacancy_data["employer"]["name"],
                    grade_name=parsed_vacancy["grade_name"],
                    work_format_names=parsed_vacancy["work_format_names"],
                    hard_skill_names=parsed_vacancy["hard_skill_names"],
                    profession=parsed_vacancy["profession"],
                    published_at=published_at,
                )
            except Exception as e:
                # TODO Добавить нормальный логгер
                print("==" * 20)
                print("Не удалось создать вакансию. Ошибка", e)
                print("Вакансия", parsed_vacancy)
                print("Url", vacancy_url)
                print("==" * 20)

    def get_http_data(self, url, params=None):
        params = params or {}
        response = self.session.get(url, headers=HEADERS, params=params)

        if response.status_code != 200:
            response.raise_for_status()

        return json.loads(response.text)

    def get_vacancies_ids(self, url):
        vacancies_ids = set()

        data = self.get_http_data(url)
        pages = data.get("pages")

        for page in range(pages):
            print(f"Получение вакансий со страницы {page + 1}")
            data = self.get_http_data(url, params={"page": page})

            vacancies = data.get("items")
            for vacancy in vacancies:
                vacancies_ids.add(vacancy.get("id"))

        return vacancies_ids

    def get_new_vacancies_ids(self):
        url = self.build_parse_url()

        vacancies_ids = self.get_vacancies_ids(url)
        vacancies_hashes = map(generate_hash, vacancies_ids)

        db_vacancies = self.get_db_vacancies()
        db_vacancies_hash = {vacancy.unique_hash for vacancy in db_vacancies}

        unique_vacancies_ids = map(
            lambda x: x[0],
            filter(
                lambda x: x[1] not in db_vacancies_hash,
                zip(vacancies_ids, vacancies_hashes),
            ),
        )

        return unique_vacancies_ids

    @staticmethod
    def get_prompted_vacancy(vacancy_data):
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
