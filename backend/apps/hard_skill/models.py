from django.db import models

from utils.managers import CountableManager


# TODO Добавить добавление скиллов через анализ гит-репозитория


class UnknownHardSkillManager(CountableManager):
    pass


class HardSkillManager(models.Manager):
    def get_queryset(self):
        # Из-за рекурсивного __str__ надо подгружать родительские __str__
        return super().get_queryset().select_related("parent__parent__parent__parent")


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


class UnknownHardSkill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    create_count = models.IntegerField(default=1)

    objects = UnknownHardSkillManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("-create_count",)
