from django.core.management.base import BaseCommand
from apps.hard_skill.models import HardSkill
from apps.hard_skill.utils.hard_skill_parser import get_skills
from utils.parsers.normalize_hard_skill import normalize_hard_skill


class Command(BaseCommand):
    help = "Создание всех навыков из файла hard_skills.yml"

    def handle(self, *args, **kwargs):
        skills_dict = get_skills()

        def create_skill(skill_data, parent=None):
            # Если skill non selectable - вернется None
            normalized_name = (
                normalize_hard_skill(skill_data["name"]) or skill_data["name"]
            )

            skill, created = HardSkill.objects.get_or_create(
                name=normalized_name,
                parent=parent,
                defaults={"selectable": skill_data.get("selectable", True)},
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Создан навык: {skill.name}"))
            return skill

        def process_skills(skills, parent=None):
            for skill_data in skills:
                skill = create_skill(skill_data, parent)
                process_skills(skill_data.get("children", []), parent=skill)

        process_skills(skills_dict)
        self.stdout.write(self.style.SUCCESS("Successfully imported skills"))
