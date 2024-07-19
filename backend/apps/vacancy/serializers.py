from rest_framework import serializers

from apps.hard_skill.serializers import HardSkillSerializer
from apps.vacancy.models import Vacancy


class VacancyListSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillSerializer(many=True)

    class Meta:
        model = Vacancy
        fields = ("id", "name", "url", "hard_skills")
