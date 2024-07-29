from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Profession
from ..serializers import ProfessionSerializer

User = get_user_model()


class ProfessionListAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test@test.com", password="password")
        self.client.login(email="test@test.com", password="password")

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
