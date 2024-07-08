from django.urls import path

from .views import ProfileHardSkillsAPIView, ProfileGradesAPIView

urlpatterns = [
    path("profile/hard_skills/", ProfileHardSkillsAPIView.as_view()),
    path("profile/grades/", ProfileGradesAPIView.as_view()),
]
