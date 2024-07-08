from rest_framework import serializers

from .models import HardSkill


class HardSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardSkill
        fields = ("id", "name")
