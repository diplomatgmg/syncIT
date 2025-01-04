from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from apps.user_profile.models import Profile


class ProfileVacancy(models.Model):
    """
    Релевантная вакансия для пользователя
    """

    # fmt: off
    is_viewed = models.BooleanField(default=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="vacancies")
    vacancy = models.ForeignKey("vacancy.Vacancy", on_delete=models.CASCADE)
    suitability = models.IntegerField(
        validators=(
            MinValueValidator(0),
            MaxValueValidator(100),
        )
    )
    # fmt: on

    class Meta:
        unique_together = ("profile", "vacancy")

    def __str__(self):
        return f"Vacancy #{self.vacancy.id} for profile {self.profile.id}"
