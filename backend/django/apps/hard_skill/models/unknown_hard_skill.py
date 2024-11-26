from django.db import models

from apps.hard_skill.models.managers.unknown_hard_skill_manager import (
    UnknownHardSkillManager,
)


class UnknownHardSkill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    create_count = models.IntegerField(default=1)

    objects = UnknownHardSkillManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("-create_count",)
