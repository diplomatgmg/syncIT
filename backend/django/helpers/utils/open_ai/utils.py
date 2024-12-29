import re
from typing import Optional


def parse_vacancy(text: str) -> Optional[dict[str, str | list[str]]]:
    def extract_pattern(pattern: str, key: str) -> Optional[str | list[str]]:
        if key == "description":
            match = re.search(pattern, text, re.DOTALL)
            if not match:
                return None
            return match.group(2)

        match = re.search(pattern, text)
        if not match:
            return None

        data = match.group(2).split(", ")
        if key in ("profession", "grade_name", "description"):
            return data[0]

        return data

    base_pattern = r"\s*(.*\S)"
    patterns = {
        "grade_name": rf"(Position|Позиция):{base_pattern}",
        "hard_skill_names": rf"(Навыки|Skills):{base_pattern}",
        "work_format_names": rf"(Формат работы|Format of work):{base_pattern}",
        "profession": rf"(Профессия|Profession):{base_pattern}",
        "description": r"(Описание|Description):\s*(.*)",
    }

    parsed_data = {
        key: extract_pattern(pattern, key) for key, pattern in patterns.items()
    }
    if any(value is None for value in parsed_data.values()):
        return None

    return parsed_data
