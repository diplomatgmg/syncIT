from apps.user_profile.tasks.find_suitable_vacancies_for_all_profiles import (
    find_suitable_vacancies_for_all_profiles,
)
from apps.user_profile.tasks.find_suitable_vacancies_for_profile import (
    find_suitable_vacancies_for_profile,
)


__all__ = [
    "find_suitable_vacancies_for_all_profiles",
    "find_suitable_vacancies_for_profile",
]
