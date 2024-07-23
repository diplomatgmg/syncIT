from django.core.management.base import BaseCommand
from apps.hard_skill.models import HardSkill
from utils.parsers.normalize_hard_skill import HARD_SKILL_MAPPING


class Command(BaseCommand):
    help = "Создание всех навыков из словаря HARD_SKILL_MAPPING"

    def handle(self, *args, **options):
        for skill_name in set(HARD_SKILL_MAPPING.values()):
            self.stdout.write(self.style.SUCCESS(f"Создается навык {skill_name}"))
            HardSkill.objects.get_or_create(name=skill_name)
        self.stdout.write(self.style.SUCCESS("Все навыки успешно созданы."))
