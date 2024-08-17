from rest_framework.renderers import JSONRenderer


def snake_to_camel(snake_str: str) -> str:
    return "".join(
        word.capitalize() if i > 0 else word
        for i, word in enumerate(snake_str.split("_"))
    )


def dict_keys_snake_to_camel(d):
    if not isinstance(d, dict):
        return d

    def process_item(item):
        if isinstance(item, dict):
            return {snake_to_camel(k): process_item(v) for k, v in item.items()}

        if isinstance(item, list):
            return [process_item(i) for i in item]

        return item

    return process_item(d)


class CamelCaseJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if isinstance(data, list):
            data = [dict_keys_snake_to_camel(item) for item in data]

        camelize_data = dict_keys_snake_to_camel(data)
        return super().render(camelize_data, accepted_media_type, renderer_context)
