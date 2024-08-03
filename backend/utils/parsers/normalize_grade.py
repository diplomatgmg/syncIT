def normalize_grade(grade: str):
    return grade.replace("+", "").replace("-", "/").replace(", ", "/").replace(",", "/")
