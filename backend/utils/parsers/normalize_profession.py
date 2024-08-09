def normalize_profession(profession: str):
    profession_lower = profession.lower()

    if "devops" in profession_lower:
        return "DevOps"

    match profession_lower:
        case "бэкенд-разработчик" | "бэкенд разработчик":
            return "Backend-разработчик"
        case "qa automation engineer" | "qa-инженер":
            return "Тестировщик"
        case "мобильный разработчик" | "mobile-разработчик":
            return "Мобильный разработчик"
        case "project manager" | "it project manager":
            return "Project Manager"
        case "data scientist":
            return "Data Scientist"
        case _:
            return profession
