import logging
from io import StringIO
from unittest.mock import patch

from django.test import TestCase

from utils.helpers import timeit

logger = logging.getLogger(__name__)


class TimeitDecoratorTest(TestCase):
    @patch("utils.helpers.logger")  # Патчим logger
    def test_timeit_decorator_output(self, mock_logger):
        @timeit
        def sample_function():
            return "test"

        with patch("sys.stdout", new=StringIO()) as _:
            result = sample_function()

            self.assertEqual(result, "test")

            mock_logger.info.assert_called()
            log_message = mock_logger.info.call_args[0][0]

            self.assertTrue("Функция" in log_message)
            self.assertTrue("секунд" in log_message)

    @patch("utils.helpers.logger")  # Патчим logger
    def test_timeit_decorator_functionality(self, mock_logger):
        @timeit
        def delayed_function():
            return "delayed"

        with patch("sys.stdout", new=StringIO()) as _:
            result = delayed_function()

            self.assertEqual(result, "delayed")

            mock_logger.info.assert_called()
            log_message = mock_logger.info.call_args[0][0]

            self.assertTrue("Функция" in log_message)
            self.assertTrue("секунд" in log_message)
