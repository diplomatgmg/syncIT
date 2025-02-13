def normalize_value(
    value: str,
    mapping: dict[str, str],
    ignore_set: tuple[str, ...],
    create_unknown: callable,
) -> str:
    """
    Универсальная функция нормализации значений.

    Преобразует входное значение согласно заданному словарю маппинга,
    игнорирует заранее заданные значения и создаёт запись для неизвестных значений.

    :param value: Исходное значение, которое требуется нормализовать.
    :param mapping: Словарь соответствий для нормализации значений.
    :param ignore_set: Кортеж значений, которые необходимо игнорировать для создания записей.
    :param create_unknown: Функция создания объекта в случае неизвестного значения.
    """
    value = value.strip().lower()
    lower_ignore_set = [item.strip().lower() for item in ignore_set]

    if value in mapping:
        return mapping[value]

    if value not in lower_ignore_set:
        create_unknown(value)

    return value
