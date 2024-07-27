import re
from typing import List, Tuple, Optional

from django.conf import settings

BASE_DIR = settings.BASE_DIR


def read_skills():
    path = BASE_DIR / "apps" / "hard_skill" / "hard_skills.yml"
    with open(path, "r") as file:
        return file.read()


def clean(text: str) -> str:
    return text.replace("-", "").replace(":", "").strip()


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
            name = clean(line)

            if not name:  # В файле скиллов могут бить отступы (пустые строки)
                continue

            node = {"name": name, "parent": parent, "children": []}

            if lines and len(re.match(r"^\s*", lines[0]).group()) > level:
                node["selectable"] = False
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
