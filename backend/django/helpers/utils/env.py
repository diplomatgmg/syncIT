import os


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

        if value is None:
            raise ValueError(
                f'Переменная окружения "{key}" не задана и значение по умолчанию не указано.'
            )

        return value
