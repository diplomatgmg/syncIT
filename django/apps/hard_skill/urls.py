from django.urls import path

from apps.hard_skill.views import HardSkillAPIView

urlpatterns = [
    path("hard_skills/", HardSkillAPIView.as_view(), name="hard-skill-list"),
]
