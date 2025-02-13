from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

from apps.user_profile.models import Profile
from apps.user_profile.views import ProfileAPIView
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
