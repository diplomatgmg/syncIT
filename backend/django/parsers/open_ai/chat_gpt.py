import logging
import re

from g4f import Provider, Client

logger = logging.getLogger("django")


def clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str | None:
    client = Client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        provider=Provider.ChatGptEs,
        messages=[{"role": "user", "content": prompt}],
    )
    return clear_text(response.choices[0].message.content)
