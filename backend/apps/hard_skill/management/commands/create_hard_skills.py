from django.core.management.base import BaseCommand

from apps.hard_skill.models import HardSkill
from apps.hard_skill.utils.hard_skill_parser import get_skills
from helpers.utils import normalize_hard_skill


class Command(BaseCommand):
    help = "Создание всех навыков из файла hard_skills.yml"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.new_skills: list[HardSkill] = []

    def create_skill(self, skill_data, parent=None):
        # Если skill non selectable - вернется None
        normalized_name = normalize_hard_skill(skill_data["name"]) or skill_data["name"]

        skill, created = HardSkill.objects.get_or_create(
            name=normalized_name,
            parent=parent,
            selectable=skill_data["selectable"],
        )

        self.new_skills.append(skill)

        if created:
            self.stdout.write(self.style.SUCCESS(f"Создан навык: {skill.name}"))

        return skill

    def process_skills(self, skills, parent=None):
        for skill_data in skills:
            skill = self.create_skill(skill_data, parent)
            self.process_skills(skill_data.get("children", []), parent=skill)

    def handle(self, *args, **kwargs):
        skills_dict = get_skills()
        self.process_skills(skills_dict)

        old_skills = HardSkill.objects.exclude(
            name__in=[skill.name for skill in self.new_skills]
        )

        for old_skill in old_skills:
            self.stdout.write(self.style.ERROR(f"Удален навык: {old_skill.name}"))
            old_skill.delete()

        self.stdout.write(self.style.SUCCESS("Скиллы успешно импортированы"))
