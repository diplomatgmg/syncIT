from django.db import models

from apps.skill.models.managers import SkillManager


class Skill(models.Model):
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

    objects = SkillManager()

    class Meta:
        unique_together = ("name", "parent")

    def __str__(self):
        return self.get_full_path()

    def get_full_path(self):
        if self.parent:
            return f"{self.parent.get_full_path()} > {self.name}"
        return self.name
