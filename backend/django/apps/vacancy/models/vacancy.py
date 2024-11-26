from django.db import models

from apps.vacancy.models.base_vacancy import BaseVacancy


class Vacancy(BaseVacancy):
    description = models.TextField()
    salary_from = models.IntegerField(blank=True, null=True)
    salary_to = models.IntegerField(blank=True, null=True)
    currency = models.CharField(max_length=5, blank=True, null=True)  # TODO ChoiceField
    experience = models.CharField(max_length=255)
    company = models.ForeignKey("company.Company", on_delete=models.CASCADE)
    grade = models.ForeignKey("grade.Grade", on_delete=models.CASCADE)
    work_formats = models.ManyToManyField(
        "work_format.WorkFormat", related_name="vacancies"
    )
    hard_skills = models.ManyToManyField(
        "hard_skill.HardSkill", related_name="vacancies"
    )
    profession = models.ForeignKey("profession.Profession", on_delete=models.CASCADE)
    created_at = models.DateTimeField(
        auto_now_add=True
    )  # TODO Мб поменять в парcере created_at и published_at местами
    published_at = models.DateTimeField()

    def __str__(self):
        return self.name
