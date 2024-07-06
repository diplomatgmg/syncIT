from django.db import models

from ..company.models import Company
from ..grade.models import Grade
from ..hard_skill.models import HardSkill


class Vacancy(models.Model):
    FORMAT_CHOICES = (
        ("r", "Удаленка"),
        ("o", "Офис"),
        ("h", "Гибрид"),
    )

    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    grades = models.ManyToManyField(Grade, related_name="vacancies")
    format = models.CharField(max_length=16, choices=FORMAT_CHOICES)
    hard_skills = models.ManyToManyField(HardSkill, related_name="vacancies")

    def __str__(self):
        return self.name
