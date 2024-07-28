from django.db import models

# TODO Добавить добавление скиллов через анализ гит-репозитория
class HardSkill(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, db_index=True
    )
    selectable = models.BooleanField(default=True)

    class Meta:
        # TODO
        # ynique_together = ('name', 'parent')
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


class UnknownHardSkillManager(models.Manager):
    def create_skill(self, name):
        """
        Увеличивает create_count при создании такого же скилла"""
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
