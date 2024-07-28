from rest_framework import serializers

from apps.hard_skill.models import HardSkill


class HardSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardSkill
        fields = ("id", "name")


class HardSkillRecursiveSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = HardSkill
        fields = ("id", "name", "selectable", "children")

    def get_children(self, obj):
        # TODO оптимизировать sql
        children = HardSkill.objects.filter(parent=obj)
        return HardSkillRecursiveSerializer(children, many=True).data
