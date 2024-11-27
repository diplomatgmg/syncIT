from django.urls import path

from apps.hard_skill.views import HardSkillProxyAPIView


urlpatterns = [
    path("hard_skills/", HardSkillProxyAPIView.as_view(), name="hard-skill-list"),
]
