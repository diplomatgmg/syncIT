import re

from g4f.client import Client


def clear_text(text: str):
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str):
    client = Client()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
    )
    return clear_text(response.choices[0].message.content)
