from django.urls import path

from apps.skill.views import SkillProxyAPIView

urlpatterns = [
    path("skills/", SkillProxyAPIView.as_view(), name="skill-list"),
]
