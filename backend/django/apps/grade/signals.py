from django.db.models.signals import post_migrate
from django.dispatch import receiver

from apps.grade.apps import GradeConfig
from apps.grade.models import Grade
from helpers.utils import sync_records
from helpers.utils.constants.grade import GRADES


@receiver(post_migrate)
def create_grades(sender: GradeConfig, **_):
    """
    Создает недостающие профессии после миграций
    """
    sync_records(
        sender,
        Grade,
        GRADES,
        lambda name: Grade(name=name),
    )


# FIXME. Теперь делай для word_formats и создай Unknown
