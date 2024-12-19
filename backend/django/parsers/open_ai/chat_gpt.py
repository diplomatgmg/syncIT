import logging
import os
import re

from openai import OpenAI

logger = logging.getLogger("django")


def clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    client = OpenAI(
        api_key=os.getenv("GPT_API_KEY"),
        base_url="https://api.aitunnel.ru/v1/",
    )
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="gpt-4o-mini",
    )

    return clear_text(response.choices[0].message.content)  # noqa
