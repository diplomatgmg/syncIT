from django.core.management.base import BaseCommand
from apps.user_profile.tasks import find_suitable_vacancies_for_all_profiles


class Command(BaseCommand):
    help = "Поиск подходящих вакансий для пользователей"

    def handle(self, *args, **kwargs):
        self.stdout.write(f"Начался поиск подходящих вакансий для пользователей")
        find_suitable_vacancies_for_all_profiles.delay()
