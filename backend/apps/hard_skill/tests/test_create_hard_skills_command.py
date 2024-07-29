from django.core.management import call_command
from django.test import TestCase
from apps.hard_skill.models import HardSkill
from io import StringIO


class ImportSkillsCommandTest(TestCase):
    def test_import_skills(self):
        out = StringIO()
        call_command("create_hard_skills", stdout=out)
        output = out.getvalue()

        # Позитивные тесты
        self.assertTrue(HardSkill.objects.filter(name="Backend").exists())
        self.assertTrue(HardSkill.objects.filter(name="Python").exists())
        self.assertTrue(HardSkill.objects.filter(name="Django").exists())
        self.assertTrue(HardSkill.objects.filter(name="Flask").exists())
        self.assertTrue(HardSkill.objects.filter(name="Django REST Framework").exists())
        self.assertTrue(HardSkill.objects.filter(name="Операционные системы").exists())

        self.assertIn("Скиллы успешно импортированы", output)
        self.assertIn("Создан навык: Backend", output)
        self.assertIn("Создан навык: Python", output)
        self.assertIn("Создан навык: Django", output)
        self.assertIn("Создан навык: Django REST Framework", output)
        self.assertIn("Создан навык: Flask", output)
        self.assertIn("Создан навык: Операционные системы", output)

        # Негативные тесты
        self.assertFalse(HardSkill.objects.filter(name="Random Skill Name").exists())
        self.assertFalse(HardSkill.objects.filter(name=" ").exists())

        self.assertNotIn("Создан навык: Random Skill Name", output)
