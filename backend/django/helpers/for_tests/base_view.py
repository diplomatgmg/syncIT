from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

User = get_user_model()


class BaseViewTestCase(APITestCase):
    """
    Базовый класс для работы с API
    """

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            email="test@example.com", password="password"
        )

    def authenticate_request(self, url):
        """
        Авторизирует запрос с помощью тестового пользователя.
        """
        request = self.factory.get(url)
        force_authenticate(request, user=self.user)
        return request

    def assert_unauthorized(self, url):
        """
        Проверяет, что неавторизованный запрос возвращает статус 401 Unauthorized.
        """
        unauth_response = self.client.get(url)
        self.assertEqual(unauth_response.status_code, status.HTTP_401_UNAUTHORIZED)
