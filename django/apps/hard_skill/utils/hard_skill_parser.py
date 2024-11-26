import re
from typing import List, Tuple, Optional

from django.conf import settings


def read_skills():
    path = settings.BASE_DIR / "apps" / "hard_skill" / "hard_skills.yml"
    with open(path, "r") as file:
        return file.read()


def clean(text: str) -> str:
    return text.replace("-", "").replace(":", "").strip()


def is_selectable(text: str) -> bool:
    return text.lstrip().startswith("-")


def parse(text: str) -> List[dict]:
    lines = text.strip().split("\n")
    return parse_lines(lines, 0)[0]


def parse_lines(
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
            selectable = is_selectable(line)
            name = clean(line)

            if not name:  # В файле скиллов могут бить отступы (пустые строки)
                continue

            node = {
                "name": name,
                "selectable": selectable,
                "parent": parent,
                "children": [],
            }

            if lines and len(re.match(r"^\s*", lines[0]).group()) > level:

                node["children"], lines = parse_lines(lines, level + 2, name)
            result.append(node)
    return result, lines


def get_skills():
    """
    Парсит hard skills из файла hard_skills.yml и возвращает скиллы в виде словаря
    """
    skills_data = read_skills()
    skills = parse(skills_data)
    return skills
