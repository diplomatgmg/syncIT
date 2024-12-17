import logging
import re

from g4f.client import Client

logger = logging.getLogger(__name__)


def clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    def get_completion(_prompt: str, _attempt: int) -> str | None:
        try:
            client = Client()
            response = client.chat.completions.create(
                model="blackboxai",
                messages=[{"role": "user", "content": _prompt}],
            )
            return clear_text(response.choices[0].message.content)  # noqa
        except Exception as e:
            logger.warning(
                f"Попытка {_attempt}: Не удалось получить ответ от Blackbox: {e}",
                exc_info=True,
            )
            return None

    attempt = 1
    while attempt <= 5:
        completion = get_completion(prompt, attempt)
        if completion is not None:
            return completion
        attempt += 1

    logger.error(
        "Не удалось получить ответ после 5 попыток.",
        exc_info=True,
    )
    return None
