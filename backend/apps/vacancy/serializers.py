from rest_framework import serializers

from apps.company.serializers import CompanySerializer
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.serializers import (
    HardSkillSerializer,
)
from apps.profession.serializers import ProfessionSerializer
from apps.vacancy.models import Vacancy, UserVacancy
from apps.work_format.serializers import WorkFormatSerializer


class VacancySerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    grade = GradeSerializer()
    profession = ProfessionSerializer()
    work_formats = WorkFormatSerializer()
    hard_skills = HardSkillSerializer(many=True)

    class Meta:
        model = Vacancy
        exclude = ("unique_hash",)


class VacancyListSerializer(serializers.ModelSerializer):
    """
    Для превью вакансии
    """

    company = CompanySerializer()
    grade = GradeSerializer()
    profession = ProfessionSerializer()
    work_formats = WorkFormatSerializer(many=True)
    hard_skills = HardSkillSerializer(many=True)

    class Meta:
        model = Vacancy
        fields = (
            "id",
            "name",
            "salary_from",
            "salary_to",
            "currency",
            "experience",
            "url",
            "company",
            "grade",
            "profession",
            "work_formats",
            "hard_skills",
            "description",
        )


class UserVacancyListSerializer(serializers.ModelSerializer):
    vacancy = VacancyListSerializer()

    class Meta:
        model = UserVacancy
        fields = ("id", "is_viewed", "suitability", "vacancy")


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


class UpdateUserVacancyViewStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVacancy
        fields = ("id", "user", "vacancy")
