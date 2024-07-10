from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Profession
from ..serializers import ProfessionSerializer


class ProfessionListAPIViewTestCase(APITestCase):
    def test_list_professions(self):
        """Проверяем, что представление возвращает список всех профессий"""
        Profession.objects.create(name="Fullstack-разработчик")
        Profession.objects.create(name="Go-разработчик")
        url = reverse("profession-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        professions = Profession.objects.all()
        self.assertCountEqual(
            response.data, ProfessionSerializer(professions, many=True).data
        )
