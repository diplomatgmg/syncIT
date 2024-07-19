from celery import shared_task
from utils.parsers.hh_parser.parser import HHParser


@shared_task
def find_vacancies():
    HHParser().start()
