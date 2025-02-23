from django.test import TestCase

from apps.skill.models import Skill
from apps.skill.serializers import SkillRecursiveSerializer


class SkillSerializerTestCase(TestCase):
    def test_serialize_skill(self):
        """Проверяем, что сериализатор корректно сериализует объект Skill"""
        skill = Skill.objects.create(name="Python")
        serializer = SkillRecursiveSerializer(skill)
        expected_data = {
            "id": skill.id,
            "name": "Python",
            "selectable": True,
            "children": [],
        }
        self.assertEqual(serializer.data, expected_data)

    def test_serialize_skill_with_children(self):
        """Проверяем сериализацию Skill с дочерними элементами"""
        parent_skill = Skill.objects.create(name="Programming")
        child_skill = Skill.objects.create(name="Python", parent=parent_skill)
        serializer = SkillRecursiveSerializer(parent_skill)
        expected_data = {
            "id": parent_skill.id,
            "name": "Programming",
            "selectable": True,
            "children": [
                {
                    "id": child_skill.id,
                    "name": "Python",
                    "selectable": True,
                    "children": [],
                }
            ],
        }
        self.assertEqual(serializer.data, expected_data)

    def test_deserialize_skill(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "JavaScript"}
        serializer = SkillRecursiveSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        skill = serializer.save()
        self.assertEqual(skill.name, "JavaScript")
