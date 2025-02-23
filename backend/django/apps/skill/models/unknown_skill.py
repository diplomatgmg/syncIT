from django.db import models

from helpers.mixins.models import CountableModelMixin


class UnknownSkill(CountableModelMixin, models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("-create_count",)
