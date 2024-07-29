from django.test import TestCase

from apps.hard_skill.models import HardSkill, UnknownHardSkill


class HardSkillModelTests(TestCase):
    def setUp(self):
        self.skill1 = HardSkill.objects.create(name="Python")
        self.skill2 = HardSkill.objects.create(name="Django", parent=self.skill1)
        self.skill3 = HardSkill.objects.create(name="React", parent=self.skill2)

    def test_hard_skill_str(self):
        # Тестируем метод __str__
        self.assertEqual(str(self.skill1), "Python")
        self.assertEqual(str(self.skill2), "Python > Django")
        self.assertEqual(str(self.skill3), "Python > Django > React")

    def test_get_full_path(self):
        # Тестируем метод get_full_path
        self.assertEqual(self.skill1.get_full_path(), "Python")
        self.assertEqual(self.skill2.get_full_path(), "Python > Django")
        self.assertEqual(self.skill3.get_full_path(), "Python > Django > React")

    def test_hard_skill_manager_prefetch_related(self):
        # Тестируем, что пользовательский менеджер предварительно загружает корректно
        skill = HardSkill.objects.get(name="React")
        self.assertTrue(skill.parent.parent is not None)


class UnknownHardSkillModelTests(TestCase):
    def test_unknown_hard_skill_str(self):
        # Тестируем метод __str__
        skill1 = UnknownHardSkill.objects.create(name="JavaScript")
        skill2 = UnknownHardSkill.objects.create(name="React")
        self.assertEqual(str(skill1), "JavaScript")
        self.assertEqual(str(skill2), "React")

    def test_create_skill(self):
        # Тестируем метод create_skill
        skill = UnknownHardSkill.objects.create_skill("TypeScript")
        self.assertIsNotNone(skill)
        self.assertEqual(skill.name, "TypeScript")
        self.assertEqual(skill.create_count, 1)

        # Создание одинакового скилла снова должно увеличить create_count
        skill = UnknownHardSkill.objects.create_skill("TypeScript")
        self.assertEqual(skill.create_count, 2)

    def test_create_skill_with_long_name(self):
        # Тестируем, что скиллы с длинным именем не создаются
        skill = UnknownHardSkill.objects.create_skill("A" * 101)
        self.assertIsNone(skill)

    def test_ordering_by_create_count(self):
        # Тестируем сортировку по create_count
        UnknownHardSkill.objects.create_skill("Python")
        UnknownHardSkill.objects.create_skill("Golang")
        UnknownHardSkill.objects.create_skill("Golang")

        skills = list(UnknownHardSkill.objects.all())
        self.assertEqual(skills[0].name, "Golang")
        self.assertEqual(skills[1].name, "Python")
