def normalize_grade(grade: str):
    return (
        grade.replace("+", "")  # Junior+ > Junior
        .replace("-", "/")  # Junior-Middle > Junior/Middle
        .replace(", ", "/")  # Junior, Middle > Junior/Middle
        .replace(",", "/")  # Junior,Middle > Junior/Middle
        .split()[0]  # Junior Backend Developer > Junior
    )
