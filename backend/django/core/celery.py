import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")

app = Celery("core")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()


app.conf.beat_schedule = {
    "parse_vacancies": {
        "task": "apps.vacancy.tasks.find_vacancies",
        "schedule": crontab(minute="0,20,40"),
    },
    "find_suitable_vacancies_for_all_profiles": {
        "task": "apps.user_profile.tasks.find_suitable_vacancies",
        "schedule": crontab(minute="10,30,50"),
    },
    "delete_old_parsed_vacancies_every_day": {
        "task": "apps.vacancy.tasks.delete_old_parsed_vacancies",
        "schedule": crontab(minute="0", hour="4"),
    },
    "delete_duplicated_vacancies_every_day": {
        "task": "apps.vacancy.tasks.delete_duplicated_vacancies",
        "schedule": crontab(minute="0", hour="5"),
    },
}

app.conf.broker_connection_retry_on_startup = True
