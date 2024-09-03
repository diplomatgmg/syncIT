from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.grade.views import GradeListAPIView
from helpers.for_tests import BaseViewTestCase


User = get_user_model()


class GradeListAPIViewViewTestCase(BaseViewTestCase):
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
