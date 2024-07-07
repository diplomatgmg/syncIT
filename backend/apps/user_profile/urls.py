from django.urls import path

from .views import ProfileAPIView

urlpatterns = [
    path("profile/hard_skills/", ProfileAPIView.as_view()),
]
