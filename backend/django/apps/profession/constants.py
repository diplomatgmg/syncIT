PROFESSIONS: tuple[str, ...] = (
    "Неизвестно",
    "Frontend-разработчик",
    "Backend-разработчик",
    "Fullstack-разработчик",
    "Тестировщик",
    "DevOps",
    "Мобильный разработчик",
    "Системный аналитик",
    "Системный администратор",
    "Data Engineer",
    "SEO-специалист",
)

IGNORE_PROFESSIONS: tuple[str, ...] = ()


PROFESSION_MAPPING = {
    "devops": "DevOps",
    "бэкенд-разработчик": "Backend-разработчик",
    "бэкенд разработчик": "Backend-разработчик",
    "backend-разработчик": "Backend-разработчик",
    "бизнес/системный аналитик": "Системный аналитик",
    "системный it-аналитик": "Системный аналитик",
    "системный аналитик": "Системный аналитик",
    "qa automation engineer": "Тестировщик",
    "qa-инженер": "Тестировщик",
    "мобильный разработчик": "Мобильный разработчик",
    "неизвестно": "Неизвестно",
    "тестировщик": "Тестировщик",
    "frontend-разработчик": "Frontend-разработчик",
    "fullstack-разработчик": "Fullstack-разработчик",
    "mobile-разработчик": "Мобильный разработчик",
    "project manager": "Project Manager",
    "it project manager": "Project Manager",
    "data scientist": "Data Scientist",
    "data engineer": "Data Engineer",
    "data инженер": "Data Engineer",
    "data-инженер": "Data Engineer",
    "системный администратор": "Системный администратор",
    "seo-специалист": "SEO-специалист",
    "seo специалист": "SEO-специалист",
}
