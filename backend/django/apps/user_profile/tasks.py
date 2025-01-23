from celery import shared_task
from constance import config
from django.db import transaction
from django.db.models import Count, Q, F

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, ProfileVacancy

SUITABILITY_PERCENT_MULTIPLIER = 60
SKILL_COEFFICIENT = 3


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
    """  # fmt: off
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
        .annotate(skill_diff=F("total_skills") - F("matching_skills"))
        .filter(skill_diff__lte=3, total_skills__gt=0)
        .annotate(
            suitability_percent=F("matching_skills")
            * SUITABILITY_PERCENT_MULTIPLIER
            / F("total_skills")
        )
        .annotate(
            suitability=F("suitability_percent")
            + (F("total_skills") * SKILL_COEFFICIENT)
        )
        .filter(suitability__gte=config.MINIMUM_VACANCY_SUITABILITY)
        .order_by("-suitability", "-matching_skills")
    )
    # fmt: on

    profile_vacancies = [
        ProfileVacancy(
            profile=profile,
            vacancy=vacancy,
            suitability=min(100, vacancy.suitability),  # type: ignore
        )
        for vacancy in filtered_vacancies
    ]

    with transaction.atomic():
        ProfileVacancy.objects.filter(profile=profile, is_viewed=False).delete()
        ProfileVacancy.objects.bulk_create(profile_vacancies)


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
