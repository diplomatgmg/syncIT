import re
from typing import List, Tuple, Optional

from django.conf import settings
from pydantic import BaseModel


def _read_skills():
    path = settings.BASE_DIR / "apps" / "hard_skill" / "hard_skills.yml"
    with open(path, "r") as file:
        return file.read()


def _clean(text: str) -> str:
    return text.replace("-", "").replace(":", "").strip()


def _is_selectable(text: str) -> bool:
    return text.lstrip().startswith("-")


def _parse(text: str) -> List[dict]:
    lines = text.strip().split("\n")
    return _parse_lines(lines, 0)[0]


def _parse_lines(
    lines: List[str], level: int, parent: Optional[str] = None
) -> Tuple[List[dict], List[str]]:
    result = []
    while lines:
        line = lines[0]
        indent = len(re.match(r"^\s*", line).group())
        if indent < level:
            break
        if indent == level:
            lines.pop(0)
            selectable = _is_selectable(line)
            name = _clean(line)

            if not name:  # В файле скиллов могут бить отступы (пустые строки)
                continue

            node = {
                "name": name,
                "selectable": selectable,
                "parent": parent,
                "children": [],
            }

            if lines and len(re.match(r"^\s*", lines[0]).group()) > level:

                node["children"], lines = _parse_lines(lines, level + 2, name)
            result.append(node)
    return result, lines


class HardSkillModel(BaseModel):
    name: str
    selectable: bool
    parent: Optional[str] = None
    children: list["HardSkillModel"] = []


def get_skills() -> list[HardSkillModel]:
    """
    Парсит hard skills из файла hard_skills.yml и возвращает скиллы в виде словаря
    """
    skills_data = _read_skills()
    skills = _parse(skills_data)
    skill_models = [HardSkillModel(**skill) for skill in skills]
    return skill_models
