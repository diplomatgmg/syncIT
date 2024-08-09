from celery import shared_task

from utils.helpers import singleton_task
from utils.parsers.hh_parser.parser import HHParser


@shared_task()
@singleton_task("find_vacancies")
def find_vacancies():
    HHParser().start()
