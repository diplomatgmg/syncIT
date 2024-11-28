from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.grade.views import GradeProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class GradeProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_grades(self):
        """Проверяем, что представление корректно работает с go"""
        Grade.objects.create(name="Junior")

        url = reverse("grade-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = GradeProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        grade = Grade.objects.first()

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data[0].keys()
        django_keys = GradeSerializer(grade).data.keys()
        self.assertEqual(go_keys, django_keys)
