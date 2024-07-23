import re

from g4f.Provider import Blackbox
from g4f.client import Client


def clear_text(text: str):
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str):
    def get_completion(_prompt: str):
        try:
            client = Client()
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                provider=Blackbox,
                messages=[{"role": "user", "content": _prompt}],
            )
            return clear_text(response.choices[0].message.content)
        except Exception as e:
            print("Unexpected error:", e)
            return get_completion(_prompt)

    completion = get_completion(prompt)
    while completion is None:
        completion = get_completion(prompt)

    return completion
