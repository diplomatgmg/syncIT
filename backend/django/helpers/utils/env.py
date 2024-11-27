import os
from core.settings.base import TESTING  # no conf.settings!


class Env:
    """
    Утилита для работы с переменными окружения.
    """

    @classmethod
    def get(cls, key: str, default=None) -> str:
        """
        Получает значение переменной окружения.
        """
        value = os.getenv(key, default)

        if value is None and not TESTING:
            raise ValueError(
                f'Переменная окружения "{key}" не задана и значение по умолчанию не указано.'
            )

        return value
