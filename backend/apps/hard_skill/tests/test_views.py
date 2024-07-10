from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import HardSkill
from ..serializers import HardSkillSerializer


class HardSkillListAPIViewTestCase(APITestCase):
    def test_list_hard_skills(self):
        """Проверяем, что представление возвращает список всех скиллов"""
        HardSkill.objects.create(name="Python")
        HardSkill.objects.create(name="JavaScript")
        url = reverse("hard-skill-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        hard_skills = HardSkill.objects.all()
        self.assertCountEqual(
            response.data, HardSkillSerializer(hard_skills, many=True).data
        )
