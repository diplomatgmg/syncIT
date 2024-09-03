from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.profession.views import ProfessionListAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class ProfessionListAPIViewViewTestCase(BaseViewTestCase):
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
