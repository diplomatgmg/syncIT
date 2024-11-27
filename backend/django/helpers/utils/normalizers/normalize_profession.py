def normalize_profession(profession: str):
    profession_mapping = {
        "devops": "DevOps",
        "бэкенд-разработчик": "Backend-разработчик",
        "бэкенд разработчик": "Backend-разработчик",
        "qa automation engineer": "Тестировщик",
        "qa-инженер": "Тестировщик",
        "мобильный разработчик": "Мобильный разработчик",
        "mobile-разработчик": "Мобильный разработчик",
        "project manager": "Project Manager",
        "it project manager": "Project Manager",
        "data scientist": "Data Scientist",
    }

    for key in profession_mapping:
        if key in profession.lower():
            return profession_mapping[key]

    return profession
