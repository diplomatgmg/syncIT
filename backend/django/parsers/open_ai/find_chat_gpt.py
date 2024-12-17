import logging
import re

import g4f

logger = logging.getLogger(__name__)


def clear_text(text: str):
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str):
    try:
        response = g4f.ChatCompletion.create(
            model="blackbox",
            messages=[{"role": "user", "content": prompt}],
        )
        return clear_text(response)
    except Exception as e:
        logger.error(f"Не удалось получить ответ от Blackbox: {e}", exc_info=True)
        return None
