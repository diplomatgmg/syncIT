from django.urls import path

from .views import HardSkillListAPIView

urlpatterns = [
    path("hard_skills/", HardSkillListAPIView.as_view(), name="hard-skill-list"),
]
