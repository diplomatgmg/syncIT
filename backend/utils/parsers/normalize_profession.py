def normalize_profession(profession: str):
    match profession.lower():
        case "devops" | "devops engineer":
            return "DevOps"
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
