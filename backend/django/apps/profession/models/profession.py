from django.db import models


class Profession(models.Model):
    name = models.CharField(max_length=100, unique=True)
    order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
