from celery import shared_task

from helpers.utils.singleton_task import singleton_task
from parsers.hh_parser.parser import HHParser


@shared_task()
@singleton_task("find_vacancies")
def find_vacancies():
    HHParser().start()
