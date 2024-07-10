from django.urls import path

from .views import (
    ProfileAPIView,
    ProfileHardSkillsAPIView,
    ProfileGradesAPIView,
    ProfileWorkFormatsAPIView,
    ProfileProfessionsAPIView,
)

urlpatterns = [
    path("", ProfileAPIView.as_view(), name="profile"),
    path(
        "hard_skills/",
        ProfileHardSkillsAPIView.as_view(),
        name="profile-hard-skill-list",
    ),
    path("grades/", ProfileGradesAPIView.as_view()),
    path("work_formats/", ProfileWorkFormatsAPIView.as_view()),
    path("professions/", ProfileProfessionsAPIView.as_view()),
]
