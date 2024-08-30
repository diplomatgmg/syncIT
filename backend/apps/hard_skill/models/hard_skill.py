from django.db import models

from apps.hard_skill.models.managers.hard_skill_manager import HardSkillManager


class HardSkill(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        db_index=True,
        related_name="children",
    )
    selectable = models.BooleanField(default=True)
    ordering = models.PositiveSmallIntegerField(default=None, null=True, blank=True)

    objects = HardSkillManager()

    class Meta:
        unique_together = ("name", "parent")
        ordering = ("ordering", "name")

    def __str__(self):
        return self.get_full_path()

    def get_full_path(self):
        if self.parent:
            return f"{self.parent.get_full_path()} > {self.name}"
        return self.name
