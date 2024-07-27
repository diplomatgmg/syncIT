from datetime import datetime, timedelta
from io import StringIO
from unittest.mock import patch

from django.test import TestCase

from utils.helpers import timeit


# Импортируем декоратор


class TimeitDecoratorTest(TestCase):
    def test_timeit_decorator_output(self):
        @timeit
        def sample_function():
            return "test"

        with patch("sys.stdout", new=StringIO()) as fake_out:
            result = sample_function()

            self.assertEqual(result, "test")

            output = fake_out.getvalue().strip()

            self.assertTrue(output.startswith("Функция"))
            self.assertTrue(output.endswith("секунд"))

    def test_timeit_decorator_functionality(self):
        @timeit
        def delayed_function():
            return "delayed"

        with patch("sys.stdout", new=StringIO()) as fake_out:
            result = delayed_function()

            self.assertEqual(result, "delayed")

            output = fake_out.getvalue().strip()
            self.assertTrue("Функция" in output)
            self.assertTrue("секунд" in output)
