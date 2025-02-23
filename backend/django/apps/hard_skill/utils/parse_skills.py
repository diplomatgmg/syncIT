import re
from typing import List, Tuple

from django.conf import settings
from pydantic import BaseModel


def _read_skills():
    path = settings.BASE_DIR / "apps" / "skill" / "skills.yml"
    with open(path, "r") as file:
        return file.read()


def _clean(text: str) -> str:
    return text.lstrip("!").rstrip(":").strip()


def _is_selectable(text: str) -> bool:
    return text.startswith("!")


def _parse(text: str) -> List[dict]:
    lines = text.strip().split("\n")
    return _parse_lines(lines, 0)[0]


def _parse_lines(lines: List[str], level: int) -> Tuple[List[dict], List[str]]:
    result = []
    while lines:
        line = lines[0]
        indent = len(re.match(r"^\s*", line).group())
        line = line.strip()
        name = _clean(line)

        if indent > level:
            raise SyntaxError(f'Некорректный отступ для "{name}"')

        if indent < level:
            break
        if indent == level:
            lines.pop(0)

            if not name:  # В файле скиллов могут бить отступы (пустые строки)
                continue

            node = {
                "name": name,
                "selectable": _is_selectable(line),
                "children": [],
            }

            if lines and len(re.match(r"^\s*", lines[0]).group()) > level:
                node["children"], lines = _parse_lines(lines, level + 2)

            result.append(node)
    return result, lines


class SkillModel(BaseModel):
    name: str
    selectable: bool
    children: list["SkillModel"] = []


def flatten_skills(skills: List[SkillModel]) -> List[SkillModel]:
    flat_list = []

    def traverse(skill_inner: SkillModel):
        flat_list.append(skill_inner)
        for child in skill_inner.children:
            traverse(child)

    for skill in skills:
        traverse(skill)

    return flat_list


def parse_skills(*, flat=False) -> list[SkillModel]:
    """
    Парсит hard skills из файла hard_skills.yml и возвращает скиллы в виде словаря
    """
    skills_data = _read_skills()
    skills = _parse(skills_data)
    skill_models = [SkillModel(**skill) for skill in skills]

    return skill_models if not flat else flatten_skills(skill_models)
