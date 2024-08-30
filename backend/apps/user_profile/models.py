from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Profile(models.Model):
    is_completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hard_skills = models.ManyToManyField(
        "hard_skill.HardSkill", related_name="profiles", blank=True
    )
    grades = models.ManyToManyField("grade.Grade", related_name="profiles", blank=True)
    work_formats = models.ManyToManyField(
        "work_format.WorkFormat", related_name="profiles", blank=True
    )
    professions = models.ManyToManyField(
        "profession.Profession", related_name="profiles", blank=True
    )

    def __str__(self):
        return f"Profile of user {self.user}"
