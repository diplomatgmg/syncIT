from rest_framework import serializers

from apps.vacancy.models import Vacancy


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
