from django.test import TestCase
from ..models import WorkFormat
from ..serializers import WorkFormatSerializer


class WorkFormatSerializerTestCase(TestCase):
    def test_serialize_work_format(self):
        """Проверяем, что сериализатор корректно сериализует объект WorkFormat"""
        work_format = WorkFormat.objects.create(name="Офис")
        serializer = WorkFormatSerializer(work_format)
        expected_data = {"id": work_format.id, "name": "Офис"}
        self.assertEqual(serializer.data, expected_data)

    def test_deserialize_work_format(self):
        """Проверяем, что сериализатор корректно десериализует данные"""
        data = {"name": "Гибрид"}
        serializer = WorkFormatSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        work_format = serializer.save()
        self.assertEqual(work_format.name, "Гибрид")
