from apps.profession.constants import (
    PROFESSION_MAPPING,
    PROFESSIONS,
    IGNORE_PROFESSIONS,
)
from apps.profession.models import UnknownProfession
from helpers.utils import normalize_value


def normalize_profession(profession: str) -> str | None:
    return normalize_value(
        profession,
        PROFESSION_MAPPING,
        PROFESSIONS + IGNORE_PROFESSIONS,
        lambda p: UnknownProfession.objects.create(name=p),
    )
