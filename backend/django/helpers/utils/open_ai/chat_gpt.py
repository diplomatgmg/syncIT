import logging
import re

from g4f import Provider, Client, models

logger = logging.getLogger("django")


def __clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    try:
        client = Client()
        response = client.chat.completions.create(
            model=models.gemini_pro,
            provider=Provider.Blackbox,
            messages=[{"role": "user", "content": prompt}],
        )
        return __clear_text(response.choices[0].message.content)  # noqa
    except Exception as e:
        logger.error(f"GPT Error\n\n{e}")
