from celery import shared_task
from constance import config
from django.db.models import Count, Q, Value, Case, When, F, FloatField

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

    filtered_vacancies = Vacancy.objects.filter(
        work_formats__in=profile.work_formats.all(),
        profession__in=profile.professions.all(),
        grade__in=profile.grades.all(),
    )

    filtered_vacancies = filtered_vacancies.annotate(
        matching_skills=Count(
            "hard_skills",
            filter=Q(hard_skills__in=profile.hard_skills.all()),
            distinct=True,
        ),
        total_skills=Count("hard_skills", distinct=True),
    )

    filtered_vacancies = filtered_vacancies.annotate(
        suitability=Case(
            When(total_skills=0, then=Value(0.0)),
            default=(F("matching_skills") * 100.0 / F("total_skills")),
            output_field=FloatField(),
        )
    )

    suitable_vacancies = filtered_vacancies.filter(
        suitability__gte=config.MINIMUM_VACANCY_SUITABILITY
    )

    profile_vacancies = [
        ProfileVacancy(
            profile=profile, vacancy=vacancy, suitability=vacancy.suitability  # type: ignore
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
