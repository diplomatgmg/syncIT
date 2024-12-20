from datetime import datetime, timedelta

from celery import shared_task

from apps.vacancy.models import ParsedVacancy
from helpers.utils import singleton_task
from parsers.hh_parser.parser import HHParser


@shared_task
@singleton_task()
def find_vacancies():
    HHParser().start()


@shared_task
def delete_old_parsed_vacancies():
    """
    Удаляет старые вакансии из БД
    """
    ParsedVacancy.objects.filter(
        created_at__lt=datetime.now() - timedelta(days=7)
    ).delete()
