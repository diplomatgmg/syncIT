from django.db import models


class HardSkill(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, db_index=True
    )
    selectable = models.BooleanField(default=True)

    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields=("name", "parent"), name="unique_hardskill_name_parent"
            ),
        )

    def __str__(self):
        # Рекурсия для получения полного дерева
        def get_full_path(skill):
            if skill.parent:
                return get_full_path(skill.parent) + " > " + skill.name
            return skill.name

        return get_full_path(self)


class UnknownHardSkill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)
