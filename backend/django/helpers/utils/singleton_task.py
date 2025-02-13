import logging
from functools import wraps

from django.core.cache import cache

logger = logging.getLogger("celery")


def singleton_task():
    """
    Singleton декоратор для тасок

    >>> @shared_task # noqa
    >>> @singleton_task() # Должнен быть первым
    >>> def func():
    >>>     pass
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            lock_id = f"{func.__name__}_lock"

            # Добавляем в кеш на 8 часов, иначе кеш может очиститься сам
            got_lock = cache.add(lock_id, "true", timeout=8 * 60 * 60)

            if not got_lock:
                logger.info(f"Task {func.__name__} is already running")
                return

            logger.info(f"Task {func.__name__} is starting execution")
            try:
                return func(*args, **kwargs)
            except Exception as e:
                logger.error(f"Task {func.__name__} raised an exception: {e}")
            finally:
                cache.delete(lock_id)

        return wrapper

    return decorator
