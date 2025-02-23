from rest_framework import serializers

from apps.company.serializers import CompanySerializer
from apps.grade.serializers import GradeSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.skill.serializers import SkillSerializer
from apps.vacancy.models import Vacancy
from apps.work_format.serializers import WorkFormatSerializer


class VacancyPreviewSerializer(serializers.ModelSerializer):
    """
    Для превью вакансии
    """

    company = CompanySerializer()
    grade = GradeSerializer()
    profession = ProfessionSerializer()
    work_formats = WorkFormatSerializer(many=True)
    skills = SkillSerializer(many=True)

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
            "skills",
            "description",
        )
