from apps.grade.serializers import GradeSerializer
from apps.hard_skill.serializers import HardSkillRecursiveSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.models import Profile
from apps.work_format.serializers import WorkFormatSerializer
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillRecursiveSerializer(many=True)
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
