from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

User = get_user_model()


class UserVacancy(models.Model):
    """
    Релевантная вакансия для пользователя
    """

    is_viewed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vacancies")
    vacancy = models.ForeignKey("vacancy.Vacancy", on_delete=models.CASCADE)
    suitability = models.IntegerField(
        validators=(
            MinValueValidator(0),
            MaxValueValidator(100),
        )
    )

    class Meta:
        unique_together = ("user", "vacancy")

    def __str__(self):
        return f"Vacancy #{self.vacancy.id} for user {self.user.email}"  # noqa
