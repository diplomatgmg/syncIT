from rest_framework import serializers

from apps.grade.serializers import GradeSerializer
from apps.hard_skill.serializers import HardSkillSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.models import Profile
from apps.work_format.serializers import WorkFormatSerializer


class ProfileSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillSerializer(many=True)
    grades = GradeSerializer(many=True)
    work_formats = WorkFormatSerializer(many=True)
    professions = ProfessionSerializer(many=True)

    class Meta:
        model = Profile
        fields = (
            "is_completed",
            "hard_skills",
            "grades",
            "work_formats",
            "professions",
        )
