def normalize_grade(grade: str):
    match grade.lower():
        case "devops", "devops engineer":
            return "DevOps"
        case _:
            return grade
