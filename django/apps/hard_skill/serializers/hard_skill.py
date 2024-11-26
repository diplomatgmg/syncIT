from apps.hard_skill.models import HardSkill
from rest_framework import serializers


class HardSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardSkill
        fields = ("id", "name")
