from django.core.management.base import BaseCommand
from django.db import transaction

from apps.hard_skill.models import HardSkill, UnknownHardSkill
from apps.hard_skill.utils import get_skills, HardSkillModel


class Command(BaseCommand):
    help = "Синхронизация навыков с файлом hard_skills.yml"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_skill_names = []
        self.updated_skill_names = []
        self.deleted_skill_names = []
        self.deleted_unknown_skill_names = []

    def _message(self, message, level="SUCCESS"):
        style = self.style.WARNING

        match level:
            case "SUCCESS":
                style = self.style.SUCCESS
            case "WARNING":
                style = self.style.WARNING
            case "ERROR":
                style = self.style.ERROR

        self.stdout.write(style(message))

    @staticmethod
    def _get_all_skill_names(skills: list[HardSkillModel]) -> set[str]:
        skill_names = set()

        def collect_names(node):
            skill_names.add(node.name)
            for child in node.children:
                collect_names(child)

        for root in skills:
            collect_names(root)
        return skill_names

    @staticmethod
    def _create_or_update_skill(node_data, parent=None) -> tuple[HardSkill, bool, bool]:
        skill, created = HardSkill.objects.get_or_create(
            name=node_data.name,
            parent=parent,
            defaults={"selectable": node_data.selectable},
        )
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

    def _delete_obsolete_skills(self, config_skill_names):
        existing_skill_names = set(HardSkill.objects.values_list("name", flat=True))
        skills_to_delete = existing_skill_names - config_skill_names
        unknown_skills_to_delete = UnknownHardSkill.objects.filter(
            name__in=config_skill_names
        )

        if skills_to_delete:
            deleted_skills = HardSkill.objects.filter(name__in=skills_to_delete)
            self.deleted_skill_names = list(
                deleted_skills.values_list("name", flat=True)
            )
            deleted_skills.delete()

        if unknown_skills_to_delete:
            self.deleted_unknown_skill_names = list(
                unknown_skills_to_delete.values_list("name", flat=True)
            )
            unknown_skills_to_delete.delete()

    def _log_results(self):
        if self.created_skill_names:
            self._message(f"Созданы навыки: {', '.join(self.created_skill_names)}")
        if self.updated_skill_names:
            self._message(f"Обновлены навыки: {', '.join(self.updated_skill_names)}")
        if self.deleted_skill_names:
            self._message(f"Удалены навыки: {', '.join(self.deleted_skill_names)}")
        if self.deleted_unknown_skill_names:
            self._message(
                f"Удалены неизвестные навыки: {', '.join(self.deleted_unknown_skill_names)}"
            )
        self._message("Синхронизация навыков завершена.")

    def handle(self, *args, **options):
        skills = get_skills()
        config_skill_names = self._get_all_skill_names(skills)

        with transaction.atomic():
            for root_data in skills:
                self._process_node(root_data)

            self._delete_obsolete_skills(config_skill_names)

        self._log_results()
