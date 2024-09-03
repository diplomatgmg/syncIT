from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillRecursiveSerializer
from apps.hard_skill.views import HardSkillAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class HardSkillListAPIViewViewTestCase(BaseViewTestCase):
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
