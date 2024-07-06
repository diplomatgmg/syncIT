from django.urls import path

from .views.HardSkillListAPIView import HardSkillListAPIView

urlpatterns = [
    path("hard_skills/", HardSkillListAPIView.as_view()),
]
