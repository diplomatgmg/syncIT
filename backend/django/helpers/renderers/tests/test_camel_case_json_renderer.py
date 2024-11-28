from rest_framework.test import APITestCase

from helpers.renderers import CamelCaseJSONRenderer
import json


class TestCamelCaseJSONRenderer(APITestCase):
    def setUp(self):
        self.renderer = CamelCaseJSONRenderer()

    def test_no_snake_case_data(self):
        data = {"firstName": "John", "lastName": "Doe"}

        rendered = self.renderer.render(data)
        rendered_data = json.loads(rendered.decode("utf-8"))

        self.assertEqual(rendered_data, data)

    def test_snake_case_data(self):
        data = {"first_name": "John", "last_name": "Doe"}
        expected = {"firstName": "John", "lastName": "Doe"}

        rendered = self.renderer.render(data)
        rendered_data = json.loads(rendered.decode("utf-8"))

        self.assertEqual(rendered_data, expected)

    def test_snake_case_recursive_data(self):
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "address_details": {
                "city_name": "New York",
                "postal_code": "10001",
                "phone_numbers": [
                    {"type": "home", "number": "123-456-7890"},
                    {"type": "work", "number": "987-654-3210"},
                ],
            },
        }

        expected = {
            "firstName": "John",
            "lastName": "Doe",
            "addressDetails": {
                "cityName": "New York",
                "postalCode": "10001",
                "phoneNumbers": [
                    {"type": "home", "number": "123-456-7890"},
                    {"type": "work", "number": "987-654-3210"},
                ],
            },
        }

        rendered = self.renderer.render(data)
        rendered_data = json.loads(rendered.decode("utf-8"))

        self.assertEqual(rendered_data, expected)

    def test_empty_data(self):
        data = {}

        rendered = self.renderer.render(data)
        rendered_data = json.loads(rendered.decode("utf-8"))

        self.assertEqual(rendered_data, data)
