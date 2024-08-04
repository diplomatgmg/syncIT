from django.contrib.auth import get_user_model
from django.test import TestCase


class UserManagerTestCase(TestCase):
    def setUp(self):
        self.User = get_user_model()

    def test_create_user(self):
        user = self.User.objects.create_user(
            email="test@example.com", password="password123"
        )
        self.assertEqual(user.email, "test@example.com")
        self.assertFalse(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        admin_user = self.User.objects.create_superuser(
            email="admin@example.com", password="admin123"
        )
        self.assertEqual(admin_user.email, "admin@example.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

    def test_create_user_invalid_email(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(email="", password="password123")

    def test_create_superuser_invalid_fields(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_superuser(
                email="superuser@example.com", password="super123", is_superuser=False
            )

    def test_user_str_representation(self):
        user = self.User.objects.create_user(
            email="user@example.com", password="user123"
        )
        self.assertEqual(str(user), user.email)
