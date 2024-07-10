from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillSerializer
from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.mixins import ProfileAttributesMixin

from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer


class ProfileHardSkillsAPIView(ProfileAttributesMixin):
    attribute_model = HardSkill
    attribute_serializer = HardSkillSerializer
    attribute_field = "hard_skills"


class ProfileGradesAPIView(ProfileAttributesMixin):
    attribute_model = Grade
    attribute_serializer = GradeSerializer
    attribute_field = "grades"


class ProfileWorkFormatsAPIView(ProfileAttributesMixin):
    attribute_model = WorkFormat
    attribute_serializer = WorkFormatSerializer
    attribute_field = "work_formats"


class ProfileProfessionsAPIView(ProfileAttributesMixin):
    attribute_model = Profession
    attribute_serializer = ProfessionSerializer
    attribute_field = "professions"
