from rest_framework import serializers

from apps.company.serializers import CompanySerializer
from apps.grade.serializers import GradeSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.skill.serializers import SkillSerializer
from apps.vacancy.models import Vacancy
from apps.work_format.serializers import WorkFormatSerializer


class VacancySerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    grade = GradeSerializer()
    profession = ProfessionSerializer()
    work_formats = WorkFormatSerializer()
    skills = SkillSerializer(many=True)

    class Meta:
        model = Vacancy
        exclude = ("unique_hash",)
