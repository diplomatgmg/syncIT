import re

import g4f


def clear_text(text: str) -> str:
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str) -> str:
    def get_completion(_prompt: str) -> str:
        try:
            response = g4f.ChatCompletion.create(
                model="blackbox",
                messages=[{"role": "user", "content": _prompt}],
            )
            return clear_text(response)
        except Exception as e:
            print("Unexpected error:", e)
            return get_completion(_prompt)

    completion = get_completion(prompt)
    while completion is None:
        completion = get_completion(prompt)

    return completion
