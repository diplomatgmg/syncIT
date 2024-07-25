from apps.vacancy.views import VacancyCreateAPIView
from django.urls import path

urlpatterns = [
    path("vacancy/", VacancyCreateAPIView.as_view()),
]
