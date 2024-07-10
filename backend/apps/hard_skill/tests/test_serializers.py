from django.test import TestCase
from ..models import HardSkill
from ..serializers import HardSkillSerializer


class HardSkillSerializerTestCase(TestCase):
    def test_serialize_hard_skill(self):
        """Проверяем, что сериализатор корректно сериализует объект HardSkill"""
        hard_skill = HardSkill.objects.create(name="Python")
        serializer = HardSkillSerializer(hard_skill)
        expected_data = {"id": hard_skill.id, "name": "Python"}
        self.assertEqual(serializer.data, expected_data)

    def test_deserialize_hard_skill(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "JavaScript"}
        serializer = HardSkillSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        hard_skill = serializer.save()
        self.assertEqual(hard_skill.name, "JavaScript")
