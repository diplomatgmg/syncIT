from rest_framework.generics import GenericAPIView, RetrieveAPIView

from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillRecursiveSerializer
from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.mixins import ProfileAttributesMixin, ProfileMixin
from apps.user_profile.serializers import ProfileIsCompletedSerializer
from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer


class ProfileAPIView(ProfileMixin, RetrieveAPIView):
    def get_object(self):
        return self.queryset.get(user=self.request.user)


class ProfileIsCompletedAPIView(ProfileMixin, RetrieveAPIView):
    serializer_class = ProfileIsCompletedSerializer

    def get_object(self):
        return self.queryset.get(user=self.request.user)


class ProfileAttributesAPIView(ProfileMixin, ProfileAttributesMixin, GenericAPIView):
    pass


class ProfileHardSkillsAPIView(ProfileAttributesAPIView):
    attribute_model = HardSkill
    attribute_serializer = HardSkillRecursiveSerializer
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
