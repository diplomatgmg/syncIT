from django.urls import path

from .views import (
    ProfileHardSkillsAPIView,
    ProfileGradesAPIView,
    ProfileWorkFormatsAPIView,
)

urlpatterns = [
    path("profile/hard_skills/", ProfileHardSkillsAPIView.as_view()),
    path("profile/grades/", ProfileGradesAPIView.as_view()),
    path("profile/work_formats/", ProfileWorkFormatsAPIView.as_view()),
]
