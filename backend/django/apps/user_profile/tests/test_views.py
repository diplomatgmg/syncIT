from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileIsCompletedSerializer
from apps.user_profile.views import ProfileAPIView, ProfileIsCompletedProxyAPIView
from helpers.for_tests import BaseViewTestCase

User = get_user_model()


class ProfileAPIViewTests(BaseViewTestCase):
    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpassword"
        )
        self.profile = Profile.objects.get(user=self.user)

    def test_profile_api_view_get(self):
        url = reverse("profile")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)

        view = ProfileAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["is_completed"], self.profile.is_completed)


class ProfileIsCompletedProxyAPIViewTests(BaseViewTestCase):
    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpassword", id=1
        )
        self.profile = Profile.objects.get(user=self.user)

    def test_profile_is_completed_api_view_get(self):
        url = reverse("profile-is-completed")
        self.assert_unauthorized(url)
        request = self.authenticate_request(url)
        request.user = self.user  # FIXME Костыль. Go при тестах использует основную БД

        view = ProfileIsCompletedProxyAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Проверяем, что сериализатор go совпадает с django
        go_keys = response.data.keys()
        django_keys = ProfileIsCompletedSerializer(self.profile).data.keys()
        self.assertEqual(go_keys, django_keys)
