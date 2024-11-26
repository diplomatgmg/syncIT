import logging
from functools import wraps

from django.core.cache import cache

logger = logging.getLogger(__name__)


def singleton_task(task_name):
    """
    Singleton декоратор для тасок
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            lock_id = f"{task_name}_lock"

            # Добавляем в кеш на 24 часа, иначе кеш может очиститься сам
            got_lock = cache.add(lock_id, "true", timeout=60 * 60 * 24)

            if not got_lock:
                logger.info(f"Task {task_name} is already running")
                return

            logger.info(f"Task {task_name} is starting execution")
            try:
                return func(*args, **kwargs)
            except Exception as e:
                logger.error(f"Task {task_name} raised an exception: {e}")
            finally:
                cache.delete(lock_id)

        return wrapper

    return decorator
