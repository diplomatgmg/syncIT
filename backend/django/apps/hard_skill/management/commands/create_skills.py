from django.core.management.base import BaseCommand
from django.db import transaction

from apps.hard_skill.models import HardSkill
from apps.hard_skill.utils import SkillModel, parse_skills


class Command(BaseCommand):
    help = "Синхронизация навыков с файлом skills.yml"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_skill_names = []
        self.updated_skill_names = []
        self.deleted_unknown_skill_names = []

        self.actual_skill_ids: list[int] = []

    def _message(self, message, level="SUCCESS"):
        style = getattr(self.style, level)
        self.stdout.write(style(message))

    def _create_or_update_skill(
        self, node_data: SkillModel, parent=None
    ) -> tuple[HardSkill, bool, bool]:
        skill, created = HardSkill.objects.get_or_create(
            name=node_data.name,
            parent=parent,
            defaults={"selectable": node_data.selectable},
        )

        self.actual_skill_ids.append(skill.id)

        updated = False

        if not created and skill.selectable != node_data.selectable:
            skill.selectable = node_data.selectable
            skill.save(update_fields=("selectable",))
            updated = True

        return skill, created, updated

    def _process_node(self, node_data, parent=None):
        skill, created, updated = self._create_or_update_skill(node_data, parent)

        if created:
            self.created_skill_names.append(node_data.name)
        elif updated:
            self.updated_skill_names.append(node_data.name)

        for child_data in node_data.children:
            self._process_node(child_data, skill)

    @staticmethod
    def _get_obsolete_values_list(
        model: HardSkill, actual_ids
    ) -> list[tuple[int, str]]:
        obsolete_ids = set(model.objects.values_list("id", flat=True)) - set(actual_ids)
        return model.objects.filter(id__in=obsolete_ids).values_list("id", "name")

    def _log_results(self):
        # fmt: off
        if self.created_skill_names:
            self._message(f"Созданы навыки: {', '.join(self.created_skill_names)}")
        if self.updated_skill_names:
            self._message(f"Обновлены навыки: {', '.join(self.updated_skill_names)}")
        if self.deleted_unknown_skill_names:
            self._message(f"Удалены навыки: {', '.join(self.deleted_unknown_skill_names)}")

        self._message("Синхронизация навыков завершена.")

        obsolete_skill_ids = set(HardSkill.objects.values_list("id", flat=True)) - set(self.actual_skill_ids)
        if obsolete_skill_ids:
            obsolete_values_list = HardSkill.objects.filter(id__in=obsolete_skill_ids).values_list("id", "name")
            formatted_skills = ", ".join(f"[{i}] {n}" for i, n in obsolete_values_list)
            self._message(f"Устаревшие навыки: {formatted_skills}", "ERROR")

        # fmt: on

    def handle(self, *args, **options):
        skills = parse_skills()

        with transaction.atomic():
            for root_data in skills:
                self._process_node(root_data)

        self._log_results()
