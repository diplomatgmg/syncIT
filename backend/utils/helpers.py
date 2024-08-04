import hashlib
import logging
import re
from datetime import datetime
from functools import wraps

from django.core.cache import caches

logger = logging.getLogger(__name__)


def snake_to_camel(snake_str: str) -> str:
    return "".join(
        word.capitalize() if i > 0 else word
        for i, word in enumerate(snake_str.split("_"))
    )


def dict_keys_snake_to_camel(d):
    if not isinstance(d, dict):
        return d

    def process_item(item):
        if isinstance(item, dict):
            return {snake_to_camel(k): process_item(v) for k, v in item.items()}

        if isinstance(item, list):
            return [process_item(i) for i in item]

        return item

    return process_item(d)


def generate_hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def clear_html(text: str) -> str:
    return re.sub(r"(<[^>]*>)|(&quot;)", "", text)


def timeit(func):
    def __normalize_path(code) -> str:
        return str(code).split('"')[-2]

    def wrapper(*args, **kwargs):
        start = datetime.now()
        result = func(*args, **kwargs)
        end = datetime.now()
        func_path = __normalize_path(func.__code__)
        logger.info(
            f"Функция {func_path} -> <{func.__name__}> выполнилась за {end - start} секунд"
        )
        return result

    return wrapper


def singleton_task(task_name):
    """
    Singleton декоратор для тасок
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            redis_instance = caches["default"]

            lock_id = f"{task_name}_lock"
            task = redis_instance.get(lock_id)

            if task:
                logger.info(f"Таска {task_name} уже выполняется")
                return

            logger.info(f"Таска {task_name} начинает выполнение")
            redis_instance.set(lock_id, "true")

            try:
                return func(*args, **kwargs)
            except Exception as e:
                logger.error(f"Таска {task_name} вызвала исключение: {e}")
                raise
            finally:
                redis_instance.delete(lock_id)

        return wrapper

    return decorator
