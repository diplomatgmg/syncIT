import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")

app = Celery("core")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()


app.conf.beat_schedule = {
    "example_task_every_minute": {
        "task": "apps.vacancy.tasks.example_task",
        "schedule": crontab(minute="*/1"),
    },
}
