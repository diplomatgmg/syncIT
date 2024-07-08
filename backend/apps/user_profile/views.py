from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Profile
from ..grade.models import Grade
from ..grade.serializers import GradeSerializer
from ..hard_skill.models import HardSkill
from ..hard_skill.serializers import HardSkillSerializer

User = get_user_model()


class ProfileHardSkillsAPIView(GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        profile = self.get_queryset().get(user=request.user)
        hard_skills = profile.hard_skills.all()
        serializer = HardSkillSerializer(hard_skills, many=True)

        return Response(serializer.data)

    def patch(self, request: Request) -> Response:
        user = request.user
        profile, _ = Profile.objects.get_or_create(user=user)

        hard_skills_data = request.data or []

        hard_skills_ids = [hs.get("id") for hs in hard_skills_data]
        hard_skills = HardSkill.objects.filter(id__in=hard_skills_ids)

        profile.hard_skills.set(hard_skills)

        serializer = HardSkillSerializer(hard_skills, many=True)
        return Response(serializer.data)


class ProfileGradesAPIView(GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        profile = self.get_queryset().get(user=request.user)
        grades = profile.grades.all()
        serializer = GradeSerializer(grades, many=True)

        return Response(serializer.data)

    def patch(self, request: Request) -> Response:
        user = request.user
        profile, _ = Profile.objects.get_or_create(user=user)

        grades_data = request.data or []

        grades_ids = [g.get("id") for g in grades_data]
        grades = Grade.objects.filter(id__in=grades_ids)

        profile.grades.set(grades)

        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)
