from django.core.management.base import BaseCommand
from apps.vacancy.tasks import find_vacancies


class Command(BaseCommand):
    help = "Запускает парсер вакансий"

    def handle(self, *args, **kwargs):
        self.stdout.write(f"Начался парсинг вакансий")
        find_vacancies.delay()
