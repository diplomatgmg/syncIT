import logging
import re
import time
import traceback

from g4f import Provider, Client, models

logger = logging.getLogger("django")


def __clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    retries = 0

    while retries <= 5:
        try:
            client = Client()
            response = client.chat.completions.create(
                model=models.deepseek_chat,
                provider=Provider.Blackbox,
                messages=[{"role": "user", "content": prompt}],
            )
            return __clear_text(response.choices[0].message.content)  # noqa
        except Exception as e:
            retries += 1
            logger.error(f"GPT Error.\n\n{e}\n\n{traceback.format_exc()}")
            time.sleep(retries**3)
