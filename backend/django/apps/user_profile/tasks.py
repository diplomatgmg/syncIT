from celery import shared_task
from django.db import transaction
from django.db.models import Count, Q, F, Value, Case, When
from django.db.models.fields import FloatField, IntegerField
from django.db.models.functions import Cast

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, ProfileVacancy

SUITABILITY_PERCENT_MULTIPLIER = 60
SKILL_COEFFICIENT = 3
from constance import config


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
    FloatCast = lambda value: Cast(value, FloatField()) # noqa

    filtered_vacancies = (
        Vacancy.objects.filter(
            work_formats__in=profile.work_formats.all(),
            profession__in=profile.professions.all(),
            grade__in=profile.grades.all(),
        )
        .only('id')
        .annotate(total_skills=Count("hard_skills"))
        .filter(total_skills__gte=config.MIN_VACANCY_SKILLS)
        .annotate(matching_skills=Count("hard_skills", filter=Q(hard_skills__in=profile.hard_skills.all())))
        .annotate(denominator=Case(
            When(matching_skills__gt=config.MAX_MATCHING_SKILLS, then=F('matching_skills')),
            default=Value(config.MAX_MATCHING_SKILLS),
            output_field=IntegerField()
            )
        )
        .annotate(suitability_percent=FloatCast("matching_skills") / FloatCast("total_skills") * Value(100))
        .annotate(coefficient = Value(1) * F('matching_skills') / F('denominator'))
        .annotate(suitability=F("coefficient") * F("suitability_percent"))
        .filter(suitability__gte=config.MIN_VACANCY_SUITABILITY)
    )
    # fmt: on

    profile_vacancies = (
        ProfileVacancy(
            profile=profile,
            vacancy=vacancy,
            suitability=vacancy.suitability,  # type: ignore
        )
        for vacancy in filtered_vacancies
    )

    with transaction.atomic():
        ProfileVacancy.objects.filter(profile=profile, is_viewed=False).delete()
        ProfileVacancy.objects.bulk_create(
            profile_vacancies,
            update_conflicts=True,
            unique_fields=("profile", "vacancy"),
            update_fields=("suitability",),
        )


r"""
   , ,, ,                              
   | || |    ,/  _____  \.             
   \_||_/    ||_/     \_||             
     ||       \_| . . |_/              
     ||         |  L  |                
    ,||         |`==='|                
    |>|      ___`>  -<'___             
    |>|\    /             \            
    \>| \  /  ,    .    .  |           
     ||  \/  /| .  |  . |  |           
     ||\  ` / | ___|___ |  |     (     
  (( || `--'  | _______ |  |     ))  ( 
(  )\|| (  )\ | - --- - | -| (  ( \  ))
(\/  || ))/ ( | -- - -- |  | )) )  \(( 
 ( ()||((( ())|         |  |( (( () )hjm
"""
