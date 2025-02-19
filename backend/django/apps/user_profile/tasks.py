from celery import shared_task
from constance import config
from django.db import transaction
from django.db.models import Count, Q, F, Value, ExpressionWrapper
from django.db.models.fields import FloatField
from django.db.models.functions import Greatest

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, ProfileVacancy

PERCENTAGE_MULTIPLIER = 50
TOTAL_SKILLS_MULTIPLIER = 50


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
    work_formats = profile.work_formats.all()
    professions = profile.professions.all()
    grades = profile.grades.all()
    hard_skills = profile.hard_skills.all()

    filtered_vacancies = (
        Vacancy.objects.filter(
            work_formats__in=work_formats,
            profession__in=professions,
            grade__in=grades,
        )
        .annotate(
            total_skills=Count("hard_skills"),
            matching_skills=Count(
                "hard_skills",
                filter=Q(hard_skills__in=hard_skills)
            )
        )
        .filter(total_skills__gte=config.MIN_VACANCY_SKILLS)
        .annotate(
            denominator=Greatest(
                F("matching_skills"),
                Value(config.MAX_MATCHING_SKILLS),
            ),
            suitability_percent=ExpressionWrapper(
                F("matching_skills") * PERCENTAGE_MULTIPLIER / F("total_skills"),
                output_field=FloatField()
            )
        )
        .annotate(
            coefficient=ExpressionWrapper(
                 F("matching_skills") * TOTAL_SKILLS_MULTIPLIER / F("denominator") ,
                output_field=FloatField()
            ),
            suitability=ExpressionWrapper(
                F("coefficient") + F("suitability_percent"),
                output_field=FloatField()
            )
        )
        .filter(suitability__gte=config.MIN_VACANCY_SUITABILITY)
        .values_list("id", "suitability")
    )
    # fmt: on

    profile_vacancies = (
        ProfileVacancy(
            profile=profile,
            vacancy_id=vacancy_id,
            suitability=suitability,
        )
        for vacancy_id, suitability in filtered_vacancies
    )

    with transaction.atomic():
        ProfileVacancy.objects.filter(profile=profile, is_viewed=False).delete()
        ProfileVacancy.objects.bulk_create(
            profile_vacancies,
            batch_size=100,
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
