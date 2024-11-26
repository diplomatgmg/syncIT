from django.db import models

from apps.profession.models.managers import UnknownProfessionManager


class UnknownProfession(models.Model):
    name = models.CharField(max_length=100, unique=True)
    create_count = models.IntegerField(default=1)

    objects = UnknownProfessionManager()

    def __str__(self):
        return self.name
