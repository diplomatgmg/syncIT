import os
import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload
from django.conf import settings


def restart_celery(command: str):
    cmd = "pkill celery"
    subprocess.call(shlex.split(cmd))

    log_level = os.getenv("CELERY_LOG_LEVEL")
    cmd = f"celery -A core.celery.app {command} -l {log_level}"

    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    help = "Запускает celery worker, beat или flower с hotreload."

    def add_arguments(self, parser):
        parser.add_argument(
            "command",
            choices=["worker", "beat", "flower"],
            help="Hotreload для worker, beat или flower",
        )

    def handle(self, *args, **kwargs):
        if not settings.DEBUG:
            raise Exception("Команда может использовать только в DEBUG режиме")

        command = kwargs["command"]
        autoreload.run_with_reloader(restart_celery, command)
