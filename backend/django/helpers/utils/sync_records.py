import logging
from typing import Iterable, Type

from django.apps import AppConfig
from django.db.models import Model
from django.db.models.functions import Lower

logger = logging.getLogger("django")


def sync_records(
    sender: AppConfig,
    model: Type[Model],
    default_values: Iterable,
    create_func: callable,
    unknown_model: Type[Model] | None = None,
):
    """
    Универсальная функция для создания недостающих записей в базе данных после миграций.

    :param sender: Название приложения, которое вызывает миграцию.
    :param model: Модель, для которой нужно создавать недостающие записи.
    :param default_values: Список значений, которые должны быть в модели.
    :param create_func: Функция для создания модели.
    :param unknown_model: Неизвестная модель, которую необходимо удалить после актуализации default_values
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

    # Записи типа ModelUnknown, которые необходимо удалить
    if unknown_model:
        lower_default_values = (value.lower() for value in default_values)
        deleted_count, _ = (
            unknown_model.objects.annotate(name_lower=Lower("name"))
            .filter(name_lower__in=lower_default_values)
            .delete()
        )

        logger.info(f"Удалено {deleted_count} {unknown_model.__name__}.")

    logger.info(f"Записи для модели {model.__name__} обновлены")
