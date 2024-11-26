from rest_framework import serializers

from apps.vacancy.models import UserVacancy


class UpdateUserVacancyViewStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVacancy
        fields = ("id", "user", "vacancy")
