from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.hard_skill.views import HardSkillProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class HardSkillProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_hard_skills(self):
        """Проверяем, что представление корректно работает с go"""
        url = reverse("hard-skill-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = HardSkillProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
