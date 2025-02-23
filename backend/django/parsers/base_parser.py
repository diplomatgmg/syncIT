import logging
from abc import ABC, abstractmethod
from typing import Literal, Type, Optional

from django.db.models import Model

from apps.company.models import Company
from apps.grade.models import Grade
from apps.profession.models import Profession
from apps.skill.models import Skill, UnknownSkill
from apps.vacancy.models import Vacancy
from apps.work_format.models import WorkFormat

logger = logging.getLogger("django")

ModelType = Type[Model]
ModelNameType = Literal[
    "vacancy",
    "company",
    "grade",
    "skill",
    "work_format",
    "profession",
]


class BaseParser(ABC):
    @staticmethod
    def filter_names(names: list[str]) -> list[str]:
        return [name for name in names if name != "Неизвестно"]

    def save_vacancy_to_db(self, data):
        unique_hash = data.get("unique_hash")

        name = data.get("name")
        description = data.get("description")
        salary_from = data.get("salary_from")
        salary_to = data.get("salary_to")
        currency = data.get("currency")
        experience = data.get("experience")
        url = data.get("url")
        published_at = data.get("published_at")

        company_name = data.get("company_name")
        company_model, _ = Company.objects.get_or_create(name=company_name)

        grade_name = data.get("grade_name")
        grade_model = self.get_or_default(Grade, grade_name)

        profession_name = data.get("profession_name")
        profession_model = self.get_or_default(Profession, profession_name)

        created_vacancy_model, _ = Vacancy.objects.get_or_create(
            unique_hash=unique_hash,
            defaults={
                "name": name,
                "description": description,
                "salary_from": salary_from,
                "salary_to": salary_to,
                "currency": currency,
                "experience": experience,
                "url": url,
                "company": company_model,
                "grade": grade_model,
                "profession": profession_model,
                "published_at": published_at,
            },
        )

        work_format_names = data.get("work_format_names")
        work_format_models = WorkFormat.objects.filter(name__in=work_format_names)
        created_vacancy_model.work_formats.add(*work_format_models)

        skill_names = data.get("skill_names")
        for skill_name in skill_names:
            skill_model = self.get_or_none(Skill, name=skill_name, selectable=True)

            if not skill_model:
                UnknownSkill.objects.create(name=skill_name)

        skill_models = Skill.objects.filter(name__in=skill_names, selectable=True)

        created_vacancy_model.skills.add(*skill_models)

    @staticmethod
    def get_or_none(model: ModelType, **kwargs) -> Optional[ModelType]:
        try:
            models = model.objects.filter(**kwargs)
            if models.count() > 1:
                logger.critical(
                    f"Найдено более одного объекта в модели {model}, kwargs: {kwargs}"
                )
            return models.first()
        except model.DoesNotExist:
            return None

    def get_or_default(
        self, model: ModelType, name: str, default: str = "Неизвестно"
    ) -> ModelType:
        obj = self.get_or_none(model, name=name)

        if not obj:
            obj, _ = model.objects.get_or_create(name=default)

        return obj

    @abstractmethod
    def start(self):
        pass
