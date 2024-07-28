from apps.vacancy.views import VacancyCreateAPIView, UserVacancyListAPIView
from django.urls import path

urlpatterns = [
    path("vacancies/", UserVacancyListAPIView.as_view()),
    path("vacancy/", VacancyCreateAPIView.as_view()),
]
