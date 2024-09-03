from django.test import TestCase

from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer


class ProfessionSerializerTestCase(TestCase):
    def test_serialize_profession(self):
        """Проверяем, что сериализатор корректно сериализует объект Profession"""
        profession = Profession.objects.create(name="Frontend-разработчик")
        serializer = ProfessionSerializer(profession)
        expected_data = {"id": profession.id, "name": "Frontend-разработчик"}
        self.assertEqual(serializer.data, expected_data)

    def test_deserialize_profession(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "Backend-разработчик"}
        serializer = ProfessionSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        profession = serializer.save()
        self.assertEqual(profession.name, "Backend-разработчик")
