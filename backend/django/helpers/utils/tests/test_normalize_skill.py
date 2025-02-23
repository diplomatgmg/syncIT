from django.test import TestCase

from apps.skill.models import UnknownSkill
from helpers.utils.normalizers import normalize_skill


class TestNormalizeSkill(TestCase):
    def test_import_skills(self):
        skills = [
            "Python",
            "JavaScript",
            "Go",
            "Rust",
        ]

        for skill in skills:
            normalized_skill = normalize_skill(skill)
            self.assertIsNotNone(normalized_skill)

    def test_unknown_skills(self):
        skills = [
            "Unknown",
            "TestSkill",
            "example",
        ]

        for skill in skills:
            normalized_skill = normalize_skill(skill)
            self.assertIsNone(normalized_skill)
            self.assertIsInstance(
                UnknownSkill.objects.filter(name=skill.lower()).first(),
                UnknownSkill,
            )
