from celery import shared_task

from helpers.utils import singleton_task
from parsers.hh_parser.parser import HHParser


# FIXME Сделать while True?
@shared_task()
@singleton_task("find_vacancies")
def find_vacancies():
    HHParser().start()
