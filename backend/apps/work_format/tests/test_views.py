from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from helpers.for_tests.base_api_test import BaseTestCase
from ..models import WorkFormat
from ..serializers import WorkFormatSerializer
from ..views import WorkFormatListAPIView

User = get_user_model()


class WorkFormatListAPIViewTestCase(BaseTestCase):
    def test_list_work_formats(self):
        """Проверяем, что представление возвращает список всех форматов работы"""
        WorkFormat.objects.create(name="Офис")
        WorkFormat.objects.create(name="Удаленка")

        url = reverse("work-format-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = WorkFormatListAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        work_formats = WorkFormat.objects.all()
        self.assertCountEqual(
            response.data, WorkFormatSerializer(work_formats, many=True).data
        )
