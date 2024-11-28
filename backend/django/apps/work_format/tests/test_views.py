from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer
from apps.work_format.views import WorkFormatProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class WorkFormatProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_work_formats(self):
        """Проверяем, что представление корректно работает с go"""
        WorkFormat.objects.create(name="Удаленка")

        url = reverse("work-format-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = WorkFormatProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        work_format = WorkFormat.objects.first()

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data[0].keys()
        django_keys = WorkFormatSerializer(work_format).data.keys()
        self.assertEqual(go_keys, django_keys)
