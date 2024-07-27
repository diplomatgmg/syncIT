from django.urls import path

from .views import HardSkillAPIView

urlpatterns = [
    path("hard_skills/", HardSkillAPIView.as_view(), name="hard-skill-list"),
]
