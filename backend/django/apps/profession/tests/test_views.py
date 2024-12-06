from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.profession.views import ProfessionProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class ProfessionProxyAPIViewTestCase(BaseViewTestCase):
    def test_list_professions(self):
        """Проверяем, что представление корректно работает с go"""
        Profession.objects.create(name="Fullstack-разработчик")

        url = reverse("profession-list")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        view = ProfessionProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        profession = Profession.objects.first()

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data[0].keys()
        django_keys = ProfessionSerializer(profession).data.keys()
        self.assertEqual(go_keys, django_keys)
