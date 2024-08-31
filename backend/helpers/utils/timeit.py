import logging
from datetime import datetime

logger = logging.getLogger(__name__)


def timeit(func):
    """
    Декоратор для оценки времени выполнения функции
    """

    def __normalize_path(code) -> str:
        return str(code).split('"')[-2]

    def wrapper(*args, **kwargs):
        start = datetime.now()
        result = func(*args, **kwargs)
        end = datetime.now()
        func_path = __normalize_path(func.__code__)
        logger.info(
            f"Функция {func_path} -> {func.__name__}() выполнилась за {end - start}"
        )
        return result

    return wrapper
