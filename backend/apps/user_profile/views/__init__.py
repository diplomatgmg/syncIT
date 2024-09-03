from apps.user_profile.views.profile import ProfileAPIView
from apps.user_profile.views.profile_grades import ProfileGradesAPIView
from apps.user_profile.views.profile_hard_skills import ProfileHardSkillsAPIView
from apps.user_profile.views.profile_is_completed import ProfileIsCompletedAPIView
from apps.user_profile.views.profile_professions import ProfileProfessionsAPIView
from apps.user_profile.views.profile_work_formats import ProfileWorkFormatsAPIView


__all__ = [
    "ProfileAPIView",
    "ProfileIsCompletedAPIView",
    "ProfileGradesAPIView",
    "ProfileHardSkillsAPIView",
    "ProfileProfessionsAPIView",
    "ProfileWorkFormatsAPIView",
]
