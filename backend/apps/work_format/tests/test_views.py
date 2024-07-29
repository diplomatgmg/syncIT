from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import WorkFormat
from ..serializers import WorkFormatSerializer


User = get_user_model()


class WorkFormatListAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test@test.com", password="password")
        self.client.login(email="test@test.com", password="password")

    def test_list_work_formats(self):
        """Проверяем, что представление возвращает список всех форматов работы"""
        WorkFormat.objects.create(name="Офис")
        WorkFormat.objects.create(name="Удаленка")
        url = reverse("work-format-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        work_formats = WorkFormat.objects.all()
        self.assertCountEqual(
            response.data, WorkFormatSerializer(work_formats, many=True).data
        )
