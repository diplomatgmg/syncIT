from rest_framework import serializers

from apps.hard_skill.serializers import HardSkillSerializer
from apps.vacancy.models import Vacancy


class VacancyListSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillSerializer(many=True)

    class Meta:
        model = Vacancy
        fields = ("id", "name", "url", "hard_skills")


class VacancyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = (
            "name",
            "salary_from",
            "salary_to",
            "experience",
            "url",
            "company",
            "grade",
            "profession",
            "work_formats",
            "hard_skills",
        )
