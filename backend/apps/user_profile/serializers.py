from rest_framework import serializers

from .models import Profile
from ..grade.serializers import GradeSerializer
from ..hard_skill.serializers import HardSkillRecursiveSerializer
from ..profession.serializers import ProfessionSerializer
from ..work_format.serializers import WorkFormatSerializer


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


class ProfileIsCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("is_completed",)
