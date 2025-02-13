from django.db.models.signals import post_migrate
from django.dispatch import receiver

from apps.profession.apps import ProfessionConfig
from apps.profession.models import Profession
from helpers.utils import sync_records
from helpers.utils.constants.profession import PROFESSIONS, IGNORE_PROFESSIONS


@receiver(post_migrate)
def create_professions(sender: ProfessionConfig, **_):
    """
    Синхронизирует константные профессии
    """
    sync_records(
        sender,
        Profession,
        PROFESSIONS + IGNORE_PROFESSIONS,
        lambda name: Profession(name=name),
    )
