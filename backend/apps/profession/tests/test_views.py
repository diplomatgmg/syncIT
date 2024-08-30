from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from helpers.for_tests.base_api_test import BaseTestCase
from ..models import Profession
from ..serializers import ProfessionSerializer
from ..views import ProfessionListAPIView

User = get_user_model()


class ProfessionListAPIViewTestCase(BaseTestCase):
    def test_list_professions(self):
        """Проверяем, что представление возвращает список всех профессий"""
        Profession.objects.create(name="Fullstack-разработчик")
        Profession.objects.create(name="Go-разработчик")

        url = reverse("profession-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = ProfessionListAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        professions = Profession.objects.all()
        self.assertCountEqual(
            response.data, ProfessionSerializer(professions, many=True).data
        )
