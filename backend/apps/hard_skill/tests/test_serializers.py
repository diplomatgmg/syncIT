from django.test import TestCase
from ..models import HardSkill
from ..serializers import HardSkillSerializer


class HardSkillSerializerTestCase(TestCase):
    def test_serialize_hard_skill(self):
        """Проверяем, что сериализатор корректно сериализует объект HardSkill"""
        hard_skill = HardSkill.objects.create(name="Python")
        serializer = HardSkillSerializer(hard_skill)
        expected_data = {
            "id": 2,
            "name": "Python",
            "selectable": True,
            "children": [],
        }
        self.assertEqual(serializer.data, expected_data)

    def test_serialize_hard_skill_with_children(self):
        """Проверяем сериализацию HardSkill с дочерними элементами"""
        parent_skill = HardSkill.objects.create(name="Programming")
        child_skill = HardSkill.objects.create(name="Python", parent=parent_skill)
        serializer = HardSkillSerializer(parent_skill)
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

    def test_deserialize_hard_skill(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "JavaScript"}
        serializer = HardSkillSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        hard_skill = serializer.save()
        self.assertEqual(hard_skill.name, "JavaScript")
