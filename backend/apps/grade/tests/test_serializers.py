from django.test import TestCase

from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer


class GradeSerializerTestCase(TestCase):
    def test_serialize_grade(self):
        """Проверяем, что сериализатор корректно сериализует объект Grade"""
        grade = Grade.objects.create(name="Junior")
        serializer = GradeSerializer(grade)
        expected_data = {"id": grade.id, "name": "Junior"}
        self.assertEqual(serializer.data, expected_data)

    def test_deserialize_grade(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "Senior"}
        serializer = GradeSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        grade = serializer.save()
        self.assertEqual(grade.name, "Senior")
