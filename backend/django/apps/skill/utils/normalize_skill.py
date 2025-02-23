from apps.skill.constants import SKILL_MAPPING, SKILLS, IGNORE_SKILLS
from apps.skill.models import UnknownSkill
from helpers.utils import normalize_value


def normalize_skill(skill: str) -> str | None:
    return normalize_value(
        skill,
        SKILL_MAPPING,
        SKILLS + IGNORE_SKILLS,
        lambda s: UnknownSkill.objects.create(name=s),
    )
