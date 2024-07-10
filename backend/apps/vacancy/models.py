from django.db import models

from ..company.models import Company
from ..grade.models import Grade
from ..hard_skill.models import HardSkill
from ..work_format.models import WorkFormat


class Vacancy(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    grades = models.ManyToManyField(Grade, related_name="vacancies")
    work_formats = models.ManyToManyField(WorkFormat, related_name="vacancies")
    hard_skills = models.ManyToManyField(HardSkill, related_name="vacancies")

    def __str__(self):
        return self.name
