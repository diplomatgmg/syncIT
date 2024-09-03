from celery import shared_task

from apps.user_profile.models import Profile
from apps.user_profile.tasks import find_suitable_vacancies_for_profile


@shared_task()
def find_suitable_vacancies_for_all_profiles():
    """
    Поиск подходящих вакансий для пользователей
    """
    profiles = Profile.objects.filter(is_completed=True)

    for profile in profiles:
        find_suitable_vacancies_for_profile.delay(profile.id)
