from django.db import models


class Vacancy(models.Model):
    FORMAT_CHOICES = (
        ("r", "Удаленка"),
        ("o", "Офис"),
        ("h", "Гибрид"),
    )

    name = models.CharField(max_length=255)
    company = models.ForeignKey("Company", on_delete=models.CASCADE)
    grades = models.ManyToManyField("Grade", related_name="vacancies")
    format = models.CharField(max_length=16, choices=FORMAT_CHOICES)
    hard_skills = models.ManyToManyField("HardSkill", related_name="jobs")

    def __str__(self):
        return self.name
