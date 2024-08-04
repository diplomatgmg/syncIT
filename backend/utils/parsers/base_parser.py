from abc import ABC, abstractmethod
from typing import Literal, Type, Optional

from django.db.models import Model

from apps.company.models import Company
from apps.grade.models import Grade
from apps.hard_skill.models import HardSkill, UnknownHardSkill
from apps.profession.models import Profession, UnknownProfession
from apps.vacancy.models import Vacancy
from apps.work_format.models import WorkFormat

import logging

logger = logging.getLogger(__name__)

ModelType = Type[Model]
ModelNameType = Literal[
    "vacancy",
    "company",
    "grade",
    "hard_skill",
    "work_format",
    "profession",
]


class BaseParser(ABC):
    def __init__(
        self, profile_hard_skills_names: list[str], profile_profession_names: list[str]
    ):
        self.profile_hard_skills_names = self.filter_names(profile_hard_skills_names)
        self.profile_profession_names = self.filter_names(profile_profession_names)

    @staticmethod
    def filter_names(names: list[str]) -> list[str]:
        return [name for name in names if name != "Неизвестно"]

    def save_vacancy_to_db(self, data):
        unique_hash = data.get("unique_hash")

        if Vacancy.objects.filter(unique_hash=unique_hash).exists():
            # Иногда, таски могут запускаться параллельно (если слишком маленький интервал)
            # Из-за этого могут парситься одинаковые вакансии
            return

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
        grade_model = self.get_or_default(Grade, grade_name, "Неизвестно")

        profession_name = data.get("profession_name")
        profession_model = self.get_or_none(Profession, name=profession_name)
        if profession_model is None:
            UnknownProfession.objects.create(name=profession_name)
            profession_model, _ = Profession.objects.get_or_create(name="Неизвестно")

        created_vacancy_model = Vacancy.objects.create(
            unique_hash=unique_hash,
            name=name,
            description=description,
            salary_from=salary_from,
            salary_to=salary_to,
            currency=currency,
            experience=experience,
            url=url,
            company=company_model,
            grade=grade_model,
            profession=profession_model,
            published_at=published_at,
        )

        work_format_names = data.get("work_format_names")
        work_format_models = WorkFormat.objects.filter(name__in=work_format_names)

        hard_skill_names = data.get("hard_skill_names")
        for hard_skill_name in hard_skill_names:
            hard_skill_model = self.get_or_none(
                HardSkill, name=hard_skill_name, selectable=True
            )

            if not hard_skill_model:
                UnknownHardSkill.objects.create(name=hard_skill_name)

        hard_skill_models = HardSkill.objects.filter(
            name__in=hard_skill_names, selectable=True
        )

        # Пропустим вакансию, если мало скиллов, иначе выдача будет не такая релевантная
        if len(hard_skill_models) < 5:
            return

        created_vacancy_model.work_formats.add(*work_format_models)
        created_vacancy_model.hard_skills.add(*hard_skill_models)

    @staticmethod
    def get_or_none(model: ModelType, **kwargs) -> Optional[ModelType]:
        try:
            models = model.objects.filter(**kwargs)
            if models.count() > 1:
                logger.error(
                    f"Найдено более одного объекта в модели {model}, kwargs: {kwargs}"
                )
            return models.first()
        except model.DoesNotExist:
            return None

    def get_or_default(self, model: ModelType, name: str, default: str) -> ModelType:
        obj = self.get_or_none(model, name=name)

        if not obj:
            logger.warning(f"Не удалось найти поле {name} в модели {model}.")
            obj, _ = model.objects.get_or_create(name=default)

        return obj

    @abstractmethod
    def start(self):
        pass
