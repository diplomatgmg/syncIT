from rest_framework import serializers

from apps.grade.serializers import GradeSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.skill.serializers import SkillSerializer
from apps.user_profile.models import Profile
from apps.work_format.serializers import WorkFormatSerializer


class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    grades = GradeSerializer(many=True)
    work_formats = WorkFormatSerializer(many=True)
    professions = ProfessionSerializer(many=True)

    class Meta:
        model = Profile
        fields = (
            "skills",
            "grades",
            "work_formats",
            "professions",
        )
