from apps.profession.models import UnknownProfession
from helpers.constants import IGNORE_PROFESSIONS, PROFESSIONS
from helpers.utils import normalize_value

PROFESSION_MAPPING = {
    "devops": "DevOps",
    "бэкенд-разработчик": "Backend-разработчик",
    "бэкенд разработчик": "Backend-разработчик",
    "backend-разработчик": "Backend-разработчик",
    "бизнес/системный аналитик": "Системный аналитик",
    "системный it-аналитик": "Системный аналитик",
    "системный аналитик": "Системный аналитик",
    "qa automation engineer": "Тестировщик",
    "qa-инженер": "Тестировщик",
    "мобильный разработчик": "Мобильный разработчик",
    "неизвестно": "Неизвестно",
    "тестировщик": "Тестировщик",
    "frontend-разработчик": "Frontend-разработчик",
    "fullstack-разработчик": "Fullstack-разработчик",
    "mobile-разработчик": "Мобильный разработчик",
    "project manager": "Project Manager",
    "it project manager": "Project Manager",
    "data scientist": "Data Scientist",
}


def normalize_profession(profession: str) -> str | None:
    return normalize_value(
        profession,
        PROFESSION_MAPPING,
        PROFESSIONS + IGNORE_PROFESSIONS,
        lambda p: UnknownProfession.objects.create(name=p),
    )
