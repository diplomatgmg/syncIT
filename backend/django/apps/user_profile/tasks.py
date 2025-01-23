from celery import shared_task
from constance import config
from django.db import transaction
from django.db.models import Count, Q, Value, Case, When, F, FloatField
from django.db.models.functions import Least

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, ProfileVacancy

SUITABILITY_PERCENT_MULTIPLIER = 125
SUITABILITY_PERCENT_DIVISOR = 1.15
SUITABILITY_WEIGHT = 1.25
MATCHING_SKILLS_WEIGHT = 0.25
MAX_SUITABILITY = 100


@shared_task()
def find_suitable_vacancies():
    """
    Поиск подходящих вакансий для пользователей
    """
    profile_ids = Profile.objects.filter(is_completed=True).values_list("id", flat=True)
    batch_size = 100
    for i in range(0, len(profile_ids), batch_size):
        batch = profile_ids[i : i + batch_size]
        find_suitable_vacancies_for_profiles.delay(list(batch))


@shared_task()
def find_suitable_vacancies_for_profiles(profile_ids: list[int]):
    profiles = Profile.objects.filter(id__in=profile_ids).prefetch_related(
        "hard_skills", "work_formats", "professions", "grades"
    )
    for profile in profiles:
        process_profile(profile)


def process_profile(profile: Profile):
    """
    Обработка подходящих вакансий для одного профиля.
    """
    # fmt: off
    filtered_vacancies = (
        Vacancy.objects.filter(
            work_formats__in=profile.work_formats.all(),
            profession__in=profile.professions.all(),
            grade__in=profile.grades.all(),
        )
        .annotate(
            matching_skills=Count(
                "hard_skills",
                filter=Q(hard_skills__in=profile.hard_skills.all()),
                distinct=True,
            ),
            total_skills=Count("hard_skills", distinct=True),
        )
        .annotate(
            suitability_percent=Case(
                When(total_skills=0, then=Value(0.0)),
                default=F("matching_skills") * SUITABILITY_PERCENT_MULTIPLIER / (F("total_skills") * SUITABILITY_PERCENT_DIVISOR),
                output_field=FloatField(),
            ),
        )
        .annotate(
            suitability=Case(
                When(total_skills=0, then=Value(0.0)),
                default=Least(
                    (F("suitability_percent") * SUITABILITY_WEIGHT+ F("matching_skills") * MATCHING_SKILLS_WEIGHT),
                    Value(MAX_SUITABILITY),
                ),
                output_field=FloatField(),
            )
        )
    )
    # fmt: on

    suitable_vacancies = filtered_vacancies.filter(
        suitability__gte=config.MINIMUM_VACANCY_SUITABILITY
    ).order_by("-suitability", "-matching_skills")

    profile_vacancies = [
        ProfileVacancy(
            profile=profile, vacancy=vacancy, suitability=vacancy.suitability  # type: ignore
        )
        for vacancy in suitable_vacancies
    ]

    with transaction.atomic():
        ProfileVacancy.objects.filter(profile=profile).delete()
        ProfileVacancy.objects.bulk_create(profile_vacancies)
