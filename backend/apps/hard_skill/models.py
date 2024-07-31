from django.db import models


# TODO Добавить добавление скиллов через анализ гит-репозитория


class HardSkillManager(models.Manager):
    def get_queryset(self):
        # Надеюсь, этот пиздец никто не увидит. Главное - работает
        # Сделано для оптимизации в админке
        # Из-за рекурсивного __str__ надо подгружать родительские __str__
        return (
            super()
            .get_queryset()
            .prefetch_related("parent__parent__parent__parent__parent")
        )


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

    objects = HardSkillManager()

    class Meta:
        unique_together = ("name", "parent")
        ordering = ("id",)

    def __str__(self):
        return self.get_full_path()

    def get_full_path(self):
        if self.parent:
            return f"{self.parent.get_full_path()} > {self.name}"
        return self.name


class UnknownHardSkillManager(models.Manager):
    def create_skill(self, name):
        """
        Увеличивает create_count при создании такого же скилла
        """
        if len(name) > 100:
            return

        skill, created = self.get_or_create(name=name)
        if created:
            skill.create_count = 1
        else:
            skill.create_count += 1
        skill.save()
        return skill


class UnknownHardSkill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    create_count = models.IntegerField(null=True)

    objects = UnknownHardSkillManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("-create_count",)
