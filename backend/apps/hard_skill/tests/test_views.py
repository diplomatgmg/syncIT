from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from helpers.for_tests.base_api_test import BaseTestCase
from ..models import HardSkill
from ..serializers import HardSkillRecursiveSerializer
from ..views import HardSkillAPIView

User = get_user_model()


class HardSkillListAPIViewTestCase(BaseTestCase):
    def test_list_hard_skills(self):
        """Проверяем, что представление возвращает список всех скиллов"""
        HardSkill.objects.create(name="Python")
        HardSkill.objects.create(name="JavaScript")

        url = reverse("hard-skill-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = HardSkillAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        hard_skills = HardSkill.objects.all()
        self.assertCountEqual(
            response.data, HardSkillRecursiveSerializer(hard_skills, many=True).data
        )
