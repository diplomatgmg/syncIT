from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from utils.base_test import BaseTestCase
from ..models import Grade
from ..serializers import GradeSerializer
from ..views import GradeListAPIView

User = get_user_model()


class GradeListAPIViewTestCase(BaseTestCase):
    def test_list_grades(self):
        """Проверяем, что представление возвращает список всех оценок"""
        Grade.objects.create(name="Junior")
        Grade.objects.create(name="Middle")

        url = reverse("grade-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = GradeListAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        grades = Grade.objects.all()
        self.assertCountEqual(response.data, GradeSerializer(grades, many=True).data)
