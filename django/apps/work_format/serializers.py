from rest_framework import serializers

from apps.work_format.models import WorkFormat


class WorkFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkFormat
        fields = ("id", "name")
