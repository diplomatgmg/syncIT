from django.db import models

from utils.managers import CountableManager


class UnknownProfessionManager(CountableManager):
    pass


class Profession(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class UnknownProfession(models.Model):
    name = models.CharField(max_length=100, unique=True)
    create_count = models.IntegerField(default=1)

    objects = UnknownProfessionManager()

    def __str__(self):
        return self.name
