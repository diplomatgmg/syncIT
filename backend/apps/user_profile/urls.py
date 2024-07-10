from django.urls import path

from .views import (
    ProfileHardSkillsAPIView,
    ProfileGradesAPIView,
    ProfileWorkFormatsAPIView,
    ProfileProfessionsAPIView,
)

urlpatterns = [
    path("profile/hard_skills/", ProfileHardSkillsAPIView.as_view()),
    path("profile/grades/", ProfileGradesAPIView.as_view()),
    path("profile/work_formats/", ProfileWorkFormatsAPIView.as_view()),
    path("profile/professions/", ProfileProfessionsAPIView.as_view()),
]
