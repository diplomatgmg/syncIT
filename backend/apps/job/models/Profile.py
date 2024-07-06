from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hard_skills = models.ManyToManyField("HardSkill", related_name="profiles")

    def __str__(self):
        return f"Profile of user {self.user}"
