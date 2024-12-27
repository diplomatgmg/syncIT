from celery import shared_task
from constance import config
from django.db import transaction
from django.db.models import Count, Q

from apps.user_profile.models import Profile
from apps.vacancy.models import Vacancy, UserVacancy


@shared_task()
def find_suitable_vacancies():
    """
    Поиск подходящих вакансий для пользователей
    """
    profiles = Profile.objects.filter(is_completed=True)

    for profile in profiles:
        process_profile(profile)


@shared_task()
def find_suitable_vacancies_for_profile(profile_id):
    profile = Profile.objects.get(id=profile_id)
    process_profile(profile)


def process_profile(profile):
    """
    Обработка подходящих вакансий для одного профиля.
    """
    profile_hard_skills = profile.hard_skills.all()
    profile_work_formats = profile.work_formats.all()
    profile_professions = profile.professions.all()
    profile_grades = profile.grades.all()

    grade_filter = Q()
    for grade in profile_grades:
        grade_filter |= Q(grade=grade)

    suitable_vacancies = (
        Vacancy.objects.filter(
            work_formats__in=profile_work_formats,
            profession__in=profile_professions,
            grade__in=profile_grades,
        )
        .filter(grade_filter)
        .annotate(
            hard_skill_count=Count(
                "hard_skills", filter=Q(hard_skills__in=profile_hard_skills)
            ),
            total_hard_skills=Count("hard_skills"),
        )
        .filter(hard_skill_count__gte=5)
    )

    bulk_create_data = []
    bulk_update_data = []

    for suitable_vacancy in suitable_vacancies:
        matching_skills_count = suitable_vacancy.hard_skill_count
        total_skills = suitable_vacancy.total_hard_skills
        suitability = round((matching_skills_count / total_skills) * 100)

        if suitability < config.MINIMUM_VACANCY_SUITABILITY:
            continue

        existing = UserVacancy.objects.filter(
            user=profile.user, vacancy=suitable_vacancy
        ).first()

        if existing:
            existing.suitability = suitability
            bulk_update_data.append(existing)
        else:
            bulk_create_data.append(
                UserVacancy(
                    user=profile.user,
                    vacancy=suitable_vacancy,
                    suitability=suitability,
                )
            )

    with transaction.atomic():
        UserVacancy.objects.filter(user=profile.user, is_viewed=False).delete()
        UserVacancy.objects.bulk_create(bulk_create_data, ignore_conflicts=True)
        UserVacancy.objects.bulk_update(bulk_update_data, ["suitability"])
