from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
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


class ParsedVacancy(BaseVacancy):
    """
    Вакансия, которая была спаршена и не подошла по критериям
    """


class Vacancy(BaseVacancy):
    description = models.TextField()
    salary_from = models.IntegerField(blank=True, null=True)
    salary_to = models.IntegerField(blank=True, null=True)
    currency = models.CharField(max_length=5, blank=True, null=True)
    experience = models.CharField(max_length=255)
    company = models.ForeignKey("Company", on_delete=models.CASCADE)
    grade = models.ForeignKey("Grade", on_delete=models.CASCADE)
    work_formats = models.ManyToManyField("WorkFormat", related_name="vacancies")
    hard_skills = models.ManyToManyField("HardSkill", related_name="vacancies")
    profession = models.ForeignKey("Profession", on_delete=models.CASCADE)
    created_at = models.DateTimeField(
        auto_now_add=True
    )  # TODO Мб поменять в парcере created_at и published_at местами
    published_at = models.DateTimeField()

    def __str__(self):
        return self.name


class UserVacancy(models.Model):
    """
    Релевантная вакансия для пользователя
    """

    is_viewed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vacancies")
    vacancy = models.ForeignKey("Vacancy", on_delete=models.CASCADE)
    suitability = models.IntegerField(
        validators=(
            MinValueValidator(0),
            MaxValueValidator(100),
        )
    )

    class Meta:
        unique_together = ("user", "vacancy")

    def __str__(self):
        return f"Vacancy #{self.vacancy.id} for user {self.user.email}"
