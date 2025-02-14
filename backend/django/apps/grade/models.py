from django.db import models


class Grade(models.Model):
    name = models.CharField(max_length=16, unique=True)
    order = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ("order",)

    def __str__(self):
        return self.name
