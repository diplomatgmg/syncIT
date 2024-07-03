from django.db import models


class Grade(models.Model):
    name = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.name
