from django.test import TestCase

from helpers.utils.normalizers import normalize_profession


class TestNormalizeProfession(TestCase):
    def test_exact_match(self):
        self.assertEqual(normalize_profession("devops"), "DevOps")
        self.assertEqual(
            normalize_profession("бэкенд-разработчик"), "Backend-разработчик"
        )
        self.assertEqual(normalize_profession("qa automation engineer"), "Тестировщик")

    def test_fuzzy_match(self):
        self.assertEqual(normalize_profession("DevOps engineer"), "DevOps")
        self.assertEqual(
            normalize_profession("Senior бэкенд-разработчик"), "Backend-разработчик"
        )
        self.assertEqual(normalize_profession("QA Automation Engineer"), "Тестировщик")

    def test_no_match(self):
        self.assertEqual(
            normalize_profession("Unknown profession"), "Unknown profession"
        )

    def test_empty_string(self):
        self.assertEqual(normalize_profession(""), "")

    def test_case_insensitivity(self):
        self.assertEqual(normalize_profession("DeVoPs"), "DevOps")
        self.assertEqual(
            normalize_profession("БЭКЕНД-РАЗРАБОТЧИК"), "Backend-разработчик"
        )
