from datetime import datetime, timedelta

from celery import shared_task

from apps.vacancy.models import ParsedVacancy
from helpers.utils import singleton_task
from parsers.hh_parser.parser import HHParser


# FIXME Сделать while True?
@shared_task
@singleton_task("find_vacancies")  # fixme убрать lock при перезапуске сервера
def find_vacancies():
    HHParser().start()


@shared_task
def delete_old_parsed_vacancies():
    """
    Удаляет старые вакансии из БД
    """
    ParsedVacancy.objects.filter(
        created_at__lt=datetime.now()
        - timedelta(days=7)  # FIXME добавить либу constance
    ).delete()
