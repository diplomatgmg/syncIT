import re
from datetime import datetime
from django.apps import apps

from utils.parsers.normalize_profession import normalize_profession
from utils.parsers.normalize_hard_skill import normalize_hard_skill


class BaseParser:
    vacancy_model = None
    company_model = None
    grade_model = None
    hard_skill_model = None
    work_format_model = None
    profession_model = None

    def __init__(self):
        self.vacancy_model = apps.get_model("vacancy", "Vacancy")
        self.company_model = apps.get_model("company", "Company")
        self.grade_model = apps.get_model("grade", "Grade")
        self.hard_skill_model = apps.get_model("hard_skill", "HardSKill")
        self.work_format_model = apps.get_model("work_format", "WorkFormat")
        self.profession_model = apps.get_model("profession", "Profession")

    def get_db_hard_skills(self):
        return self.hard_skill_model.objects.all()

    def get_db_work_formats(self):
        return self.work_format_model.objects.all()

    def get_db_vacancies(self):
        return self.vacancy_model.objects.all()

    def save_vacancy_to_db(
        self,
        *,
        unique_hash: str,
        name: str,
        description: str,
        salary_from: str,
        salary_to: str,
        experience: str,
        url: str,
        company_name: str,
        grade_name: str,
        work_format_names: list[str],
        hard_skill_names: set[str],
        profession: str,
        published_at: datetime,
    ):

        company_model, _ = self.company_model.objects.get_or_create(name=company_name)

        try:
            grade_model = self.grade_model.objects.get(name=grade_name)
        except self.grade_model.DoesNotExist:
            print(f"Неизвестный грейд: {grade_name}")
            return

        work_format_models = self.work_format_model.objects.filter(
            name__in=work_format_names
        )

        normalized_hard_skills = tuple(
            filter(lambda x: x, map(normalize_hard_skill, hard_skill_names))
        )

        for normalized_hard_skill in normalized_hard_skills:
            self.hard_skill_model.objects.get_or_create(name=normalized_hard_skill)

        if len(normalized_hard_skills) < 5:
            print(f"Не хватает навыков. Скипаем {normalized_hard_skills}")
            return

        hard_skill_models = self.hard_skill_model.objects.filter(
            name__in=normalized_hard_skills
        )

        try:
            normalized_profession = normalize_profession(profession)
            profession_model = self.profession_model.objects.get(
                name=normalized_profession
            )
        except self.profession_model.DoesNotExist:
            print(f"Неизвестная профессия: {profession}")
            profession_model = self.profession_model.objects.get(name="Неизвестно")

        created_vacancy_model = self.vacancy_model.objects.create(
            unique_hash=unique_hash,
            name=name,
            description=description,
            salary_from=salary_from,
            salary_to=salary_to,
            experience=experience,
            url=url,
            company=company_model,
            grade=grade_model,
            profession=profession_model,
            published_at=published_at,
        )

        created_vacancy_model.work_formats.add(*work_format_models)
        created_vacancy_model.hard_skills.add(*hard_skill_models)

    @staticmethod
    def parse_vacancy(text: str):
        base_pattern = r"\s*(.*\S)"
        grades_pattern = rf"Позиция:{base_pattern}"
        hard_skills_pattern = rf"Навыки:{base_pattern}"
        work_format_pattern = rf"Формат работы:{base_pattern}"
        profession_pattern = rf"Профессия:{base_pattern}"

        try:
            grade_name = re.search(grades_pattern, text).group(1).split(", ")[0]
            hard_skill_names = re.search(hard_skills_pattern, text).group(1).split(", ")
            work_format_names = (
                re.search(work_format_pattern, text).group(1).split(", ")
            )
            profession = re.search(profession_pattern, text).group(1)
        except AttributeError:
            return None

        return {
            "grade_name": grade_name,
            "hard_skill_names": set(hard_skill_names),
            "work_format_names": work_format_names,
            "profession": profession,
        }

    def start(self):
        raise NotImplementedError
