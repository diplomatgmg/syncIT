from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Profile
from ..hard_skill.serializers import HardSkillSerializer

User = get_user_model()


class ProfileAPIView(GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = HardSkillSerializer

    def get(self, request: Request) -> Response:
        profile = self.get_queryset().get(user=request.user)
        hard_skills = profile.hard_skills.all()

        serialized_data = self.get_serializer(hard_skills, many=True)
        return Response(serialized_data.data)

    def patch(self, request: Request) -> Response:
        hard_skills_ids = map(lambda x: x["id"], request.data)
        user = request.user

        profile, _ = Profile.objects.get_or_create(user=user)
        profile.hard_skills.clear()
        profile.hard_skills.set(hard_skills_ids)

        serialized_data = self.get_serializer(profile.hard_skills.all(), many=True)
        return Response({"hard_skills": serialized_data.data})
