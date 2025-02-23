from rest_framework import serializers

from apps.skill.models import Skill


class SkillRecursiveSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ("id", "name", "selectable", "children")

    def get_children(self, obj: Skill):
        children = obj.children.all()
        serialized_children = SkillRecursiveSerializer(children, many=True).data
        return serialized_children
