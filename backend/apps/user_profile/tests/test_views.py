from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from ..models import Profile
from ..views import ProfileAPIView

User = get_user_model()


class ProfileAPIViewTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpassword"
        )
        self.profile = Profile.objects.get(user=self.user)

    def test_profile_api_view_get(self):
        url = reverse("profile")
        request = self.factory.get(url)
        force_authenticate(request, user=self.user)

        view = ProfileAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.profile.id)
        self.assertEqual(response.data["is_complete"], self.profile.is_complete)

    def test_profile_api_view_unauthorized(self):
        url = reverse("profile")
        request = self.factory.get(url)

        view = ProfileAPIView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
