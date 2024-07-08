from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillSerializer
from apps.user_profile.mixins import ProfileAttributesMixin
from rest_framework.generics import GenericAPIView


class ProfileHardSkillsAPIView(ProfileAttributesMixin, GenericAPIView):
    attribute_model = HardSkill
    attribute_serializer = HardSkillSerializer
    attribute_field = "hard_skills"


class ProfileGradesAPIView(ProfileAttributesMixin, GenericAPIView):
    attribute_model = Grade
    attribute_serializer = GradeSerializer
    attribute_field = "grades"
