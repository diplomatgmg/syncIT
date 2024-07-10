from rest_framework.generics import GenericAPIView

from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillSerializer
from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.mixins import ProfileAttributesMixin, ProfileMixin
from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer
from rest_framework.request import Request
from rest_framework.response import Response


class ProfileAPIView(ProfileMixin, GenericAPIView):
    def get(self, request: Request) -> Response:
        profile = self.get_queryset().get(user=request.user)
        serializer = self.get_serializer(profile)

        return Response(serializer.data)


class ProfileAttributesAPIView(ProfileMixin, ProfileAttributesMixin, GenericAPIView):
    pass


class ProfileHardSkillsAPIView(ProfileAttributesAPIView):
    attribute_model = HardSkill
    attribute_serializer = HardSkillSerializer
    attribute_field = "hard_skills"


class ProfileGradesAPIView(ProfileAttributesAPIView):
    attribute_model = Grade
    attribute_serializer = GradeSerializer
    attribute_field = "grades"


class ProfileWorkFormatsAPIView(ProfileAttributesAPIView):
    attribute_model = WorkFormat
    attribute_serializer = WorkFormatSerializer
    attribute_field = "work_formats"


class ProfileProfessionsAPIView(ProfileAttributesAPIView):
    attribute_model = Profession
    attribute_serializer = ProfessionSerializer
    attribute_field = "professions"
