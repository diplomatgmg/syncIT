from celery import shared_task
from constance import config
from django.db.models import Count, Q, F, ExpressionWrapper, FloatField

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, ProfileVacancy


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
    profile_hard_skills = profile.hard_skills.all()
    profile_work_formats = profile.work_formats.all()
    profile_professions = profile.professions.all()
    profile_grades = profile.grades.all()

    suitable_vacancies = (
        Vacancy.objects.filter(
            hard_skills__in=profile_hard_skills,
            work_formats__in=profile_work_formats,
            profession__in=profile_professions,
            grade__in=profile_grades,
        )
        .annotate(
            matching_skills=Count(
                "hard_skills", filter=Q(hard_skills__in=profile_hard_skills)
            ),
            total_skills=Count("hard_skills", distinct=True),
        )
        .filter(matching_skills__gte=5)
        .annotate(
            suitability=ExpressionWrapper(
                (F("matching_skills") / F("total_skills")) * 100,
                output_field=FloatField(),
            )
        )
        .filter(suitability__gte=config.MINIMUM_VACANCY_SUITABILITY)
        .distinct()
    )

    profile_vacancies = [
        ProfileVacancy(
            profile=profile, vacancy=vacancy, suitability=vacancy.suitability
        )
        for vacancy in suitable_vacancies
    ]

    ProfileVacancy.objects.bulk_create(profile_vacancies, ignore_conflicts=True)
    existing_vacancy_ids = set(
        ProfileVacancy.objects.filter(profile=profile).values_list(
            "vacancy_id", flat=True
        )
    )
    suitable_vacancy_ids = set(suitable_vacancies.values_list("id", flat=True))
    ProfileVacancy.objects.filter(
        profile=profile, vacancy_id__in=existing_vacancy_ids - suitable_vacancy_ids
    ).delete()
