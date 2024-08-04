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
        "schedule": crontab(minute="*/10"),
    },
    "find_suitable_vacancies": {
        "task": "apps.user_profile.tasks.find_suitable_vacancies",
        "schedule": crontab(minute="*/10"),
    },
}

app.conf.broker_connection_retry_on_startup = True
