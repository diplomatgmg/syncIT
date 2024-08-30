import re


def clear_html(text: str) -> str:
    return re.sub(r"(<[^>]*>)|(&quot;)", "", text)
