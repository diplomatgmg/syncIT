from django.db import models

from ..company.models import Company
from ..grade.models import Grade
from ..hard_skill.models import HardSkill
from ..profession.models import Profession
from ..work_format.models import WorkFormat


class Vacancy(models.Model):
    unique_hash = models.CharField(
        max_length=64, unique=True, blank=True, null=True, editable=False
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    salary_from = models.IntegerField(blank=True, null=True)
    salary_to = models.IntegerField(blank=True, null=True)
    experience = models.CharField(max_length=255)
    url = models.URLField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    work_formats = models.ManyToManyField(WorkFormat, related_name="vacancies")
    hard_skills = models.ManyToManyField(HardSkill, related_name="vacancies")
    profession = models.ForeignKey(Profession, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField()
    # Придумать, как показывать пользователю вакансии, которые он не смотрел.
    # Которые смотрел - отобразить на фронте снизу

    def __str__(self):
        return self.name
