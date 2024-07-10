from django.test import TestCase
from ..models import Vacancy
from ...company.models import Company
from ...grade.models import Grade
from ...hard_skill.models import HardSkill
from ...work_format.models import WorkFormat


class VacancyTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(name="Test Company")
        self.grade = Grade.objects.create(name="Junior")
        self.work_format = WorkFormat.objects.create(name="Remote")
        self.hard_skill = HardSkill.objects.create(name="Python")

    def test_vacancy_creation(self):
        vacancy = Vacancy.objects.create(
            name="Software Engineer",
            company=self.company,
        )
        vacancy.grades.add(self.grade)
        vacancy.work_formats.add(self.work_format)
        vacancy.hard_skills.add(self.hard_skill)

        self.assertEqual(vacancy.name, "Software Engineer")
        self.assertEqual(vacancy.company, self.company)
        self.assertIn(self.grade, vacancy.grades.all())
        self.assertIn(self.work_format, vacancy.work_formats.all())
        self.assertIn(self.hard_skill, vacancy.hard_skills.all())

    def test_vacancy_string_representation(self):
        vacancy = Vacancy.objects.create(
            name="Software Developer",
            company=self.company,
        )
        self.assertEqual(str(vacancy), vacancy.name)
