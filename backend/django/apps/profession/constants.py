# fmt: off
_PROFESSION_GROUPS = {
    "DevOps": ("devops",),
    "Backend-разработчик": ("бэкенд-разработчик", "бэкенд разработчик", "backend-разработчик",),
    "Системный аналитик": ("бизнес/системный аналитик", "системный it-аналитик", "системный аналитик",),
    "Тестировщик": ("qa automation engineer", "qa-инженер", "тестировщик"),
    "Мобильный разработчик": ("мобильный разработчик", "mobile-разработчик"),
    "Неизвестно": ("неизвестно",),
    "Frontend-разработчик": ("frontend-разработчик",),
    "Fullstack-разработчик": ("fullstack-разработчик",),
    "Project Manager": ("project manager", "it project manager"),
    "Data Scientist": ("data scientist",),
    "Data Engineer": ("data engineer", "data инженер", "data-инженер"),
    "Системный администратор": ("системный администратор",),
    "SEO-специалист": ("seo-специалист", "seo специалист"),
}
# fmt: on


IGNORE_PROFESSIONS: tuple[str, ...] = ()

PROFESSIONS: tuple[str, ...] = tuple(_PROFESSION_GROUPS.keys())

# {
#    "devops": "DevOps",
#    "бэкенд-разработчик": "Backend-разработчик",
#    "backend-разработчик": "Backend-разработчик",
#    "бизнес/системный аналитик": "Системный аналитик",
# }
PROFESSION_MAPPING = {
    key: profession for profession, keys in _PROFESSION_GROUPS.items() for key in keys
}
