from django.urls import path

from .views import ProfessionListAPIView

urlpatterns = [
    path("professions/", ProfessionListAPIView.as_view(), name="profession-list"),
]
