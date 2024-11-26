from apps.vacancy.views import *
from django.urls import path

urlpatterns = [
    path("vacancies/", UserVacancyListAPIView.as_view()),
    path("vacancy/", VacancyCreateAPIView.as_view()),
    path("vacancy/view/", UpdateVacancyViewStatusAPIView.as_view()),
]
