from django.urls import path

from .views import (
    ProfileHardSkillsAPIView,
    ProfileGradesAPIView,
    ProfileWorkFormatsAPIView,
    ProfileProfessionsAPIView,
)

urlpatterns = [
    path("hard_skills/", ProfileHardSkillsAPIView.as_view()),
    path("grades/", ProfileGradesAPIView.as_view()),
    path("work_formats/", ProfileWorkFormatsAPIView.as_view()),
    path("professions/", ProfileProfessionsAPIView.as_view()),
]
