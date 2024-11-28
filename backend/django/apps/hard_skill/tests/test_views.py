from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import (
    HardSkillRecursiveSerializer,
)
from apps.hard_skill.views import HardSkillProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class HardSkillProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_hard_skills(self):
        """Проверяем, что представление корректно работает с go"""
        HardSkill.objects.create(name="Python")

        url = reverse("hard-skill-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = HardSkillProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        hard_skill = HardSkill.objects.first()

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data[0].keys()
        django_keys = HardSkillRecursiveSerializer(hard_skill).data.keys()
        self.assertEqual(go_keys, django_keys)
