from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.skill.models import Skill
from apps.skill.serializers import (
    SkillRecursiveSerializer,
)
from apps.skill.views import SkillProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class SkillProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_skills(self):
        """Проверяем, что представление корректно работает с go"""
        Skill.objects.create(name="Python")

        url = reverse("skill-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = SkillProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        skill = Skill.objects.first()

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data[0].keys()
        django_keys = SkillRecursiveSerializer(skill).data.keys()
        self.assertEqual(go_keys, django_keys)
