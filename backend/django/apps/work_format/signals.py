from django.db.models.signals import post_migrate
from django.dispatch import receiver

from apps.work_format.apps import WorkFormatConfig
from apps.work_format.constants import WORK_FORMATS
from apps.work_format.models import WorkFormat
from helpers.utils import sync_records


@receiver(post_migrate)
def create_work_formats(sender: WorkFormatConfig, **_):
    """
    Синхронизирует константные форматы работы
    """
    sync_records(
        sender,
        WorkFormat,
        WORK_FORMATS,
        lambda name: WorkFormat(name=name),
    )
