from io import StringIO

from django.core.management import call_command
from django.test import TestCase

from apps.hard_skill.models import HardSkill


class ImportSkillsCommandTest(TestCase):
    def test_import_skills(self):
        out = StringIO()
        call_command("create_skills", stdout=out)
        output = out.getvalue()

        # Позитивные тесты
        self.assertTrue(HardSkill.objects.filter(name="Backend").exists())
        self.assertTrue(HardSkill.objects.filter(name="Python").exists())
        self.assertTrue(HardSkill.objects.filter(name="Django").exists())
        self.assertTrue(HardSkill.objects.filter(name="Flask").exists())
        self.assertTrue(HardSkill.objects.filter(name="Django REST Framework").exists())
        self.assertTrue(HardSkill.objects.filter(name="Операционные системы").exists())

        self.assertIn("Созданы навыки", output)
        self.assertIn("Backend", output)
        self.assertIn("Python", output)
        self.assertIn("Django", output)
        self.assertIn("Django REST Framework", output)
        self.assertIn("Flask", output)
        self.assertIn("Операционные системы", output)

        # Негативные тесты
        self.assertFalse(HardSkill.objects.filter(name="Random Skill Name").exists())
        self.assertFalse(HardSkill.objects.filter(name=" ").exists())

        self.assertNotIn("Создан навык: Random Skill Name", output)
