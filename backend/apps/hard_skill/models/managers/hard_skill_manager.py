from django.db import models


class HardSkillManager(models.Manager):
    def get_queryset(self):
        # Из-за рекурсивного __str__ надо подгружать родительские __str__
        return super().get_queryset().select_related("parent__parent__parent__parent")
