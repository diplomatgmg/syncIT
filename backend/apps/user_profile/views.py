from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile

User = get_user_model()


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        profile = Profile.objects.get(user=request.user)
        hard_skill_ids = profile.hard_skills.values_list("id", flat=True)

        return Response(hard_skill_ids)

    def patch(self, request: Request) -> Response:
        hard_skills = request.data.get("hard_skills", [])

        user = User.objects.get(email=request.user.email)
        profile, _ = Profile.objects.get_or_create(user=user)

        profile.hard_skills.clear()
        profile.hard_skills.set(hard_skills)

        return Response({"hard_skills": profile.hard_skills.values()})
