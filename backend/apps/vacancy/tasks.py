from celery import shared_task

from apps.user_profile.models import Profile
from utils.parsers.hh_parser.parser import HHParser


@shared_task
def find_vacancies():
    profiles = Profile.objects.filter(is_completed=True)

    for profile in profiles:
        profile_hard_skills = profile.hard_skills.all()
        profile_professions = profile.professions.all()

        HHParser(
            hard_skills=profile_hard_skills,
            professions=profile_professions,
        ).start()
