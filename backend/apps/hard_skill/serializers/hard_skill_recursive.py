from rest_framework import serializers

from apps.hard_skill.models import HardSkill


class HardSkillRecursiveSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = HardSkill
        fields = ("id", "name", "selectable", "children")

    def get_children(self, obj: HardSkill):
        children = obj.children.all()
        serialized_children = HardSkillRecursiveSerializer(children, many=True).data
        return serialized_children
