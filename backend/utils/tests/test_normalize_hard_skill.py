from django.test import TestCase

from apps.hard_skill.models import UnknownHardSkill
from utils.parsers.normalize_hard_skill import normalize_hard_skill


class TestNormalizeHardSkill(TestCase):
    def test_import_skills(self):
        skills = [
            "Python",
            "JavaScript",
            "Go",
            "Rust",
        ]

        for skill in skills:
            normalized_skill = normalize_hard_skill(skill)
            self.assertIsNotNone(normalized_skill)

    def test_unknown_skills(self):
        skills = [
            "Unknown",
            "TestSkill",
            "Example",
        ]

        for skill in skills:
            normalized_skill = normalize_hard_skill(skill)
            self.assertIsNone(normalized_skill)
            self.assertIsInstance(
                UnknownHardSkill.objects.filter(name=skill).first(),
                UnknownHardSkill,
            )
