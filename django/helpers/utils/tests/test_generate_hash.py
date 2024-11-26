import hashlib

from django.test import TestCase

from helpers.utils import generate_hash


class GenerateHashCase(TestCase):
    def test_generate_hash(self):
        value = "hello"
        expected_hash = hashlib.sha256(value.encode()).hexdigest()
        self.assertEqual(generate_hash(value), expected_hash)
