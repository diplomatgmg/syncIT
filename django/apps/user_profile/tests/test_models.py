from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.grade.models import Grade
from apps.hard_skill.models import HardSkill
from apps.profession.models import Profession
from apps.user_profile.models import Profile
from apps.work_format.models import WorkFormat

User = get_user_model()


class ProfileModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testuser@example.com")
        self.profile = Profile.objects.create(user=self.user)
        self.hard_skill1 = HardSkill.objects.create(name="Skill1")
        self.hard_skill2 = HardSkill.objects.create(name="Skill2")
        self.hard_skill3 = HardSkill.objects.create(name="Skill3")
        self.grade = Grade.objects.create(name="Grade1")
        self.work_format = WorkFormat.objects.create(name="Remote")
        self.profession = Profession.objects.create(name="Developer")

    def test_is_complete_flag(self):
        """
        Тестирует, что флаг is_completed устанавливается в True, если все условия выполнены.
        В данном случае, все связанные поля имеют значения и hard_skills содержит минимум три элемента.
        """
        self.profile.hard_skills.set(
            [self.hard_skill1, self.hard_skill2, self.hard_skill3]
        )
        self.profile.grades.set([self.grade])
        self.profile.work_formats.set([self.work_format])
        self.profile.professions.set([self.profession])
        self.profile.refresh_from_db()

        self.assertTrue(self.profile.is_completed)

    def test_is_complete_flag_incomplete(self):
        """
        Тестирует, что флаг is_completed устанавливается в False, если хотя бы одно условие не выполнено.
        В данном случае, grades пуст и hard_skills содержит менее трех элементов.
        """
        self.profile.hard_skills.set([self.hard_skill1])
        self.profile.grades.set([])
        self.profile.work_formats.set([self.work_format])
        self.profile.professions.set([self.profession])
        self.profile.refresh_from_db()

        self.assertFalse(self.profile.is_completed)
