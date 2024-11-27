from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.profession.views import ProfessionProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class ProfessionProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_professions(self):
        """Проверяем, что представление корректно работает с go"""
        url = reverse("profession-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = ProfessionProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
