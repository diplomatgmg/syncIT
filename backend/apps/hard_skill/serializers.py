from rest_framework import serializers
from django.core.cache import cache

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

    def get_children(self, obj: HardSkill):
        # Мб можно обойтись без кеширования
        cache_key = f"hard_skill_{obj.id}_children"
        cached_children = cache.get(cache_key)

        if cached_children is not None:
            return cached_children

        children = obj.children.all()
        serialized_children = HardSkillRecursiveSerializer(children, many=True).data
        cache.set(cache_key, serialized_children, timeout=600)  # 10 Минут
        return serialized_children
