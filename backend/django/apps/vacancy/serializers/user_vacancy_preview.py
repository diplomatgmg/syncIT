from rest_framework import serializers

from apps.vacancy.models import ProfileVacancy
from apps.vacancy.serializers import VacancyPreviewSerializer


class UserVacancyPreviewSerializer(serializers.ModelSerializer):
    vacancy = VacancyPreviewSerializer()

    class Meta:
        model = ProfileVacancy
        fields = ("id", "is_viewed", "suitability", "vacancy")
