import hashlib
import re
from datetime import datetime


def dict_keys_snake_to_camel(input_dict):
    def convert_to_camel_case(key):
        return re.sub("([_-])([a-z])", lambda match: match.group(2).upper(), key)

    def convert_dict(input_dict):
        if not isinstance(input_dict, dict):
            return input_dict

        new_dict = {}
        for key, value in input_dict.items():
            new_key = convert_to_camel_case(key)
            if isinstance(value, dict):
                new_dict[new_key] = convert_dict(value)
            elif isinstance(value, list):
                new_dict[new_key] = [
                    convert_dict(item) if isinstance(item, dict) else item
                    for item in value
                ]
            else:
                new_dict[new_key] = value
        return new_dict

    return convert_dict(input_dict)


def generate_hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def clear_html(text: str) -> str:
    return re.sub(r"(<[^>]*>)|(&quot;)", "", text)


def timeit(func):
    def __normalize_path(code) -> str:
        return str(code).split('"')[-2]

    def wrapper(*args, **kwargs):
        start = datetime.now()
        result = func(*args, **kwargs)
        end = datetime.now()
        func_path = __normalize_path(func.__code__)
        print(f"Функция {func_path} выполнилась за {end - start} секунд")
        return result

    return wrapper
