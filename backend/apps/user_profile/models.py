from django.contrib.auth import get_user_model
from django.db import models

from ..grade.models import Grade
from ..hard_skill.models import HardSkill
from ..profession.models import Profession
from ..work_format.models import WorkFormat

User = get_user_model()


class Profile(models.Model):
    is_completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hard_skills = models.ManyToManyField(HardSkill, related_name="profiles", blank=True)
    grades = models.ManyToManyField(Grade, related_name="profiles", blank=True)
    work_formats = models.ManyToManyField(
        WorkFormat, related_name="profiles", blank=True
    )
    professions = models.ManyToManyField(
        Profession, related_name="profiles", blank=True
    )

    def __str__(self):
        return f"Profile of user {self.user}"
