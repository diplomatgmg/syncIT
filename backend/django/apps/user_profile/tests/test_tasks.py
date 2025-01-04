import uuid

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from apps.company.models import Company
from apps.grade.models import Grade
from apps.hard_skill.models import HardSkill
from apps.profession.models import Profession
from apps.user_profile.models import Profile
from apps.user_profile.tasks import process_profile
from apps.vacancy.models import Vacancy, ProfileVacancy
from apps.work_format.models import WorkFormat

User = get_user_model()

# fmt: off
def _create_grades():
    return [
        Grade.objects.create(name=name)
        for name in ["Junior", "Middle", "Senior"]
    ]


def _create_professions():
    return [
        Profession.objects.create(name=name)
        for name in ["Frontend", "Backend", "Fullstack"]
    ]


def _create_work_formats():
    return [
        WorkFormat.objects.create(name=name)
        for name in ["Удаленка", "Офис", "Гибрид"]
    ]


def _create_hard_skills():
    return [
        HardSkill.objects.create(name=f"Skill {i}")
        for i in range(10)
    ]
# fmt: on


class ProcessProfileTaskTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testuser@example.com")
        self.profile = Profile.objects.get(user=self.user)

        self.company = Company.objects.create(name="Test company")
        self.grades = _create_grades()
        self.professions = _create_professions()
        self.work_formats = _create_work_formats()
        self.hard_skills = _create_hard_skills()

    def _create_vacancy(
        self,
        profession: Profession,
        grade: Grade,
        work_formats: list[WorkFormat],
        hard_skills: list[HardSkill],
    ) -> Vacancy:
        vacancy = Vacancy.objects.create(
            unique_hash=uuid.uuid4(),
            published_at=timezone.now(),
            experience="Нет опыта",
            company=self.company,
            profession=profession,
            grade=grade,
        )
        vacancy.hard_skills.add(*hard_skills)
        vacancy.work_formats.add(*work_formats)

        return vacancy

    def _setup_profile(
        self,
        professions: list[Profession],
        grades: list[Grade],
        work_formats: list[WorkFormat],
        hard_skills: list[HardSkill],
    ):
        self.profile.professions.add(*professions)
        self.profile.grades.add(*grades)
        self.profile.work_formats.add(*work_formats)
        self.profile.hard_skills.add(*hard_skills)

    def test_empty_vacancies(self):
        self.assertEqual(self.profile.vacancies.count(), 0)
        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 0)

    def test_creating_vacancies(self):
        vacancy1 = self._create_vacancy(
            self.professions[0], self.grades[0], self.work_formats, self.hard_skills
        )
        vacancy2 = self._create_vacancy(
            self.professions[1], self.grades[1], self.work_formats, self.hard_skills
        )
        ProfileVacancy.objects.create(
            profile=self.profile, vacancy=vacancy1, suitability=100
        )
        ProfileVacancy.objects.create(
            profile=self.profile, vacancy=vacancy2, suitability=50
        )

        self.assertEqual(self.profile.vacancies.count(), 2)
        self.assertEqual(self.profile.vacancies.first().suitability, 100)
        self.assertEqual(self.profile.vacancies.last().suitability, 50)

    # fmt: off
    def test_0_suitability(self):
        self._setup_profile(
            self.professions,
            self.grades,
            self.work_formats,
            [HardSkill.objects.create(name="New Skill")]
        )
        self._create_vacancy(self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 0)

    def test_20_suitability(self):
        self._setup_profile(self.professions, self.grades, self.work_formats, self.hard_skills[:2])
        self._create_vacancy( self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 20)

    def test_40_suitability(self):
        self._setup_profile(self.professions, self.grades, self.work_formats, self.hard_skills[:4])
        self._create_vacancy(self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 40)

    def test_60_suitability(self):
        self._setup_profile(self.professions, self.grades, self.work_formats, self.hard_skills[:6])
        self._create_vacancy(self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 60)

    def test_80_suitability(self):
        self._setup_profile(self.professions, self.grades, self.work_formats, self.hard_skills[:8])
        self._create_vacancy(self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 80)

    def test_100_suitability(self):
        self._setup_profile(self.professions, self.grades, self.work_formats, self.hard_skills)
        self._create_vacancy(self.professions[0], self.grades[0], self.work_formats, self.hard_skills)

        process_profile(self.profile)
        self.assertEqual(self.profile.vacancies.count(), 1)
        self.assertEqual(self.profile.vacancies.first().suitability, 100)
    # fmt: on
