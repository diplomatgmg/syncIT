from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import WorkFormat
from ..serializers import WorkFormatSerializer


class WorkFormatListAPIViewTestCase(APITestCase):
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
