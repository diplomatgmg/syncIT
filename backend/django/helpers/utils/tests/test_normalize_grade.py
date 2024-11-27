from django.test import TestCase

from helpers.utils.normalizers import normalize_grade


class NormalizeGradeTest(TestCase):
    def test_replace_plus(self):
        self.assertEqual(normalize_grade("Junior+"), "Junior")

    def test_replace_minus(self):
        self.assertEqual(normalize_grade("Junior-Middle"), "Junior/Middle")

    def test_replace_comma_space(self):
        self.assertEqual(normalize_grade("Junior, Middle"), "Junior/Middle")

    def test_replace_comma(self):
        self.assertEqual(normalize_grade("Junior,Middle"), "Junior/Middle")

    def test_split(self):
        self.assertEqual(normalize_grade("Junior Backend Developer"), "Junior")

    def test_no_changes(self):
        self.assertEqual(normalize_grade("Junior"), "Junior")

    def test_none_value(self):
        with self.assertRaises(AttributeError):
            normalize_grade(None)  # noqa
