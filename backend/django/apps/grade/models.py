from django.db import models


class Grade(models.Model):
    name = models.CharField(max_length=16, unique=True)
    ordering = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
