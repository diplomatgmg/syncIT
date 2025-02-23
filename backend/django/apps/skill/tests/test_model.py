from django.core.exceptions import ValidationError
from django.test import TestCase

from apps.skill.models import Skill, UnknownSkill


class SkillModelTests(TestCase):
    def setUp(self):
        self.skill1 = Skill.objects.create(name="Python")
        self.skill2 = Skill.objects.create(name="Django", parent=self.skill1)
        self.skill3 = Skill.objects.create(name="React", parent=self.skill2)

    def test_skill_str(self):
        # Тестируем метод __str__
        self.assertEqual(str(self.skill1), "Python")
        self.assertEqual(str(self.skill2), "Python > Django")
        self.assertEqual(str(self.skill3), "Python > Django > React")

    def test_get_full_path(self):
        # Тестируем метод get_full_path
        self.assertEqual(self.skill1.get_full_path(), "Python")
        self.assertEqual(self.skill2.get_full_path(), "Python > Django")
        self.assertEqual(self.skill3.get_full_path(), "Python > Django > React")

    def test_skill_manager_prefetch_related(self):
        # Тестируем, что пользовательский менеджер предварительно загружает корректно
        skill = Skill.objects.get(name="React")
        self.assertTrue(skill.parent.parent is not None)


class UnknownSkillModelTests(TestCase):
    def test_unknown_skill_str(self):
        # Тестируем метод __str__
        skill1 = UnknownSkill.objects.create(name="JavaScript")
        skill2 = UnknownSkill.objects.create(name="React")
        self.assertEqual(str(skill1), "JavaScript")
        self.assertEqual(str(skill2), "React")

    def test_create_skill(self):
        # Тестируем метод create_skill
        skill = UnknownSkill.objects.create(name="TypeScript")
        self.assertIsNotNone(skill)
        self.assertEqual(skill.name, "TypeScript")
        self.assertEqual(skill.create_count, 1)

        # Создание одинакового скилла снова должно увеличить create_count
        skill = UnknownSkill.objects.create(name="TypeScript")
        self.assertEqual(skill.create_count, 2)

    def test_create_skill_with_long_name(self):
        # Тестируем, что скиллы с длинным именем не создаются
        long_name = "A" * 101
        skill = UnknownSkill(name=long_name)

        with self.assertRaises(ValidationError):
            skill.full_clean()

    def test_ordering_by_create_count(self):
        # Тестируем сортировку по create_count
        UnknownSkill.objects.create(name="Python")
        UnknownSkill.objects.create(name="Golang")
        UnknownSkill.objects.create(name="Golang")

        skills = list(UnknownSkill.objects.all())
        self.assertEqual(skills[0].name, "Golang")
        self.assertEqual(skills[1].name, "Python")
