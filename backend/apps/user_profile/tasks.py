from datetime import datetime, timedelta

from celery.app import shared_task
from django.db.models import Count, Q

from .models import Profile
from ..vacancy.models import Vacancy, UserVacancy


@shared_task()
def find_suitable_vacancies():
    """
    Поиск подходящих вакансий для пользователей
    """
    profiles = Profile.objects.filter(is_completed=True)
    newest_vacancies = Vacancy.objects.filter(
        published_at__gt=datetime.now() - timedelta(days=1)
    )

    for profile in profiles:
        profile_hard_skills = profile.hard_skills.all()
        profile_work_formats = profile.work_formats.all()
        profile_professions = profile.professions.all()
        profile_grades = profile.grades.all()

        suitable_vacancies = newest_vacancies.annotate(
            hard_skill_count=Count(
                "hard_skills", filter=Q(hard_skills__in=profile_hard_skills)
            )
        ).filter(
            hard_skill_count__gte=5,
            work_formats__in=profile_work_formats,
            profession__in=profile_professions,
            grade__in=profile_grades,
        )

        print(suitable_vacancies)
        for suitable_vacancy in suitable_vacancies:
            UserVacancy.objects.get_or_create(
                user=profile.user, vacancy=suitable_vacancy
            )
