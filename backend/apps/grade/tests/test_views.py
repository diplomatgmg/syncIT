from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Grade
from ..serializers import GradeSerializer

User = get_user_model()


class GradeListAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test@test.com", password="password")
        self.client.login(email="test@test.com", password="password")

    def test_list_grades(self):
        """Проверяем, что представление возвращает список всех оценок"""
        Grade.objects.create(name="Junior")
        Grade.objects.create(name="Middle")
        url = reverse("grade-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        grades = Grade.objects.all()
        self.assertCountEqual(response.data, GradeSerializer(grades, many=True).data)
