import logging
import re
import time

import g4f
import g4f.Provider

logger = logging.getLogger("django")


def clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    def get_completion(_attempt: int) -> str | None:
        try:
            client = g4f.client.Client()
            response = client.chat.completions.create(
                model=g4f.models.gpt_35_turbo,
                provider=g4f.Provider.ChatGptEs,
                messages=[{"role": "user", "content": prompt}],
            )
            return clear_text(response.choices[0].message.content)  # noqa
        except Exception as e:
            logger.warning(
                f"Попытка {_attempt}: Не удалось получить ответ от провайдера: {e}",
                exc_info=True,
            )
            return None

    attempt = 1
    while attempt <= 5:
        completion = get_completion(attempt)
        if completion is not None:
            return completion
        time.sleep(15)
        attempt += 1

    logger.error(
        "Не удалось получить ответ после 5 попыток.",
        exc_info=True,
    )
    return None
