from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from apps.hard_skill.models import HardSkill
from apps.user_profile.models import Profile

User = get_user_model()


class ProfileHardSkillsAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpassword"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.profile = Profile.objects.get(user=self.user)

        self.hard_skill1 = HardSkill.objects.create(name="Skill 1")
        self.hard_skill2 = HardSkill.objects.create(name="Skill 2")
        self.profile.hard_skills.add(self.hard_skill1, self.hard_skill2)

    def test_get_hard_skills(self):
        url = reverse("profile-hard-skill-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_patch_hard_skills(self):
        url = reverse("profile-hard-skill-list")
        data = [{"id": self.hard_skill1.id}, {"id": self.hard_skill2.id}]

        response = self.client.patch(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
