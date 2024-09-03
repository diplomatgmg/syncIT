from rest_framework import serializers

from apps.company.serializers import CompanySerializer
from apps.grade.serializers import GradeSerializer
from apps.hard_skill.serializers import HardSkillSerializer
from apps.profession.serializers import ProfessionSerializer
from apps.vacancy.models import Vacancy
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
