from rest_framework import serializers

from apps.vacancy.models import ProfileVacancy


class UpdateUserVacancyViewStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileVacancy
        fields = ("id", "profile", "vacancy")
