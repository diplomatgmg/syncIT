from celery import shared_task

from apps.user_profile.models import Profile
from utils.parsers.hh_parser.parser import HHParser


@shared_task()
def find_vacancies():
    profiles = Profile.objects.filter(is_completed=True)

    for profile in profiles:
        profile_hard_skills = profile.hard_skills.values_list(
            "name", flat=True
        ).distinct()
        profile_professions = profile.professions.values_list("name", flat=True)

        HHParser(
            profile_hard_skills_names=profile_hard_skills,
            profile_profession_names=profile_professions,
        ).start()
