def normalize_profession(profession: str):
    match profession.lower():
        case "devops", "devops engineer":
            return "DevOps"
        case _:
            return profession
    # TODO добавить нормализатор профессии на основе имени вакансии
