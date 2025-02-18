from django.urls import path

from apps.vacancy.views import *

urlpatterns = [
    path("vacancies/", UserVacancyListAPIView.as_view()),
    path("vacancy/", VacancyCreateAPIView.as_view()),
    path("vacancy/view/", UpdateVacancyViewStatusAPIView.as_view()),
]
