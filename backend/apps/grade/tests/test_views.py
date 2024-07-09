from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Grade
from ..serializers import GradeSerializer


class GradeListAPIViewTestCase(APITestCase):
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
