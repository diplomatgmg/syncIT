from celery import shared_task

from helpers.utils import singleton_task
from parsers.hh_parser.parser import HHParser


@shared_task()
@singleton_task("find_vacancies")
def find_vacancies():
    HHParser().start()
