from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BaseVacancy(models.Model):
    unique_hash = models.CharField(max_length=64, unique=True, editable=False)
    name = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.unique_hash

    class Meta:
        abstract = True
