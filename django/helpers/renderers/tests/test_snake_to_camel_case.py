from django.test import TestCase

from helpers.renderers.utils import dict_keys_snake_to_camel


class SnakeToCamelTestCase(TestCase):
    def test_snake_to_camel_case_dict_single_level(self):
        input_dict = {
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "1990-01-01",
            "address_details": {"city_name": "New York", "postal_code": "10001"},
        }

        expected_output = {
            "firstName": "John",
            "lastName": "Doe",
            "dateOfBirth": "1990-01-01",
            "addressDetails": {"cityName": "New York", "postalCode": "10001"},
        }

        self.assertEqual(dict_keys_snake_to_camel(input_dict), expected_output)

    def test_snake_to_camel_case_dict_nested_lists(self):
        input_dict = {
            "user_details": {
                "first_name": "John",
                "last_name": "Doe",
                "phone_numbers": [
                    {"type": "home", "number": "123-456-7890"},
                    {"type": "work", "number": "987-654-3210"},
                ],
            }
        }

        expected_output = {
            "userDetails": {
                "firstName": "John",
                "lastName": "Doe",
                "phoneNumbers": [
                    {"type": "home", "number": "123-456-7890"},
                    {"type": "work", "number": "987-654-3210"},
                ],
            }
        }

        self.assertEqual(dict_keys_snake_to_camel(input_dict), expected_output)

    def test_snake_to_camel_case_dict_empty_input(self):
        input_dict = {}

        expected_output = {}

        self.assertEqual(dict_keys_snake_to_camel(input_dict), expected_output)

    def test_snake_to_camel_case_dict_non_dict_input(self):
        input_value = "some_string"

        expected_output = "some_string"

        self.assertEqual(dict_keys_snake_to_camel(input_value), expected_output)

    def test_snake_to_camel_case_dict_no_conversion_needed(self):
        input_dict = {"firstName": "John", "lastName": "Doe"}

        expected_output = {"firstName": "John", "lastName": "Doe"}

        self.assertEqual(dict_keys_snake_to_camel(input_dict), expected_output)
