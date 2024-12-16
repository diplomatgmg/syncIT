from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BaseVacancy(models.Model):
    unique_hash = models.CharField(max_length=64, unique=True, editable=False)
    name = models.CharField(max_length=255)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.unique_hash
