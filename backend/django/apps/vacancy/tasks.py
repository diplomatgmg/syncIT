from datetime import datetime, timedelta

from celery import shared_task
from constance import config
from django.db.models import Count

from apps.vacancy.models import ParsedVacancy, Vacancy
from helpers.utils import singleton_task
from parsers.hh_parser.parser import HHParser


@shared_task
@singleton_task()
def find_vacancies():
    """
    Запускает парсеры вакансий
    """
    # TODO Использовать threading когда появятся другие парсеры
    HHParser().start()


@shared_task
def delete_old_parsed_vacancies():
    """
    Удаляет старые вакансии из БД
    """
    ParsedVacancy.objects.filter(
        created_at__lt=datetime.now()
        - timedelta(days=config.INTERVAL_DELETE_PARSED_VACANCIES)
    ).delete()


@shared_task
def delete_duplicated_vacancies():
    """
    Удаляет одинаковые вакансии.
    """
    duplicate_groups = (
        Vacancy.objects.values(
            "name",
            "company",
            "experience",
            "salary_from",
            "salary_to",
            "grade",
            "profession",
        )
        .annotate(duplicate_count=Count("id"))
        .filter(duplicate_count__gt=1)
    )

    for group in duplicate_groups:
        filter_params = {
            "name": group["name"],
            "company": group["company"],
            "experience": group["experience"],
            "salary_from": group["salary_from"],
            "salary_to": group["salary_to"],
            "grade": group["grade"],
            "profession": group["profession"],
        }
        qs = Vacancy.objects.filter(**filter_params).order_by("id")
        vacancy_to_keep = qs.first()
        qs.exclude(id=vacancy_to_keep.id).delete()
