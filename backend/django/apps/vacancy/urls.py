from django.urls import path

from apps.vacancy.views import *
from apps.vacancy.views.update_vacancy_view_status import TestView

urlpatterns = [
    path("vacancies/", UserVacancyListAPIView.as_view()),
    path("vacancy/", VacancyCreateAPIView.as_view()),
    path("vacancy/view/", UpdateVacancyViewStatusAPIView.as_view()),
    path("vacancy/test/", TestView.as_view()),
]
