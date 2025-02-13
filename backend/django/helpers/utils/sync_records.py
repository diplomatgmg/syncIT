import logging
from typing import Iterable, Type

from django.apps import AppConfig
from django.db.models import Model

logger = logging.getLogger("django")


def sync_records(
    sender: AppConfig,
    model: Type[Model],
    default_values: Iterable,
    create_func: callable,
):
    """
    Универсальная функция для создания недостающих записей в базе данных после миграций.

    :param sender: Название приложения, которое вызывает миграцию.
    :param model: Модель, для которой нужно создавать недостающие записи.
    :param default_values: Список значений, которые должны быть в модели.
    :param create_func: Функция для создания модели.
    """
    if not sender.name == f"apps.{model._meta.app_label}":
        return

    logger.info(f"Обновляются записи для модели {model.__name__}...")

    existing_records = model.objects.filter(name__in=default_values).values_list(
        "name", flat=True
    )

    # Записи, которых нет в базе, добавляем
    missing_records = set(default_values) - set(existing_records)
    if missing_records:
        model.objects.bulk_create([create_func(record) for record in missing_records])
        logger.info(f"Создано {len(missing_records)} {model.__name__}.")

    # Записи, которых нет в default_values, удаляем
    extra_records = model.objects.exclude(name__in=default_values)
    if extra_records.exists():
        deleted_count, _ = extra_records.delete()
        logger.info(f"Удалено {deleted_count} {model.__name__}.")

    logger.info(f"Записи для модели {model.__name__} обновлены")
