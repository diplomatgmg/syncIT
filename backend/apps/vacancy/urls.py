from apps.vacancy.views import (
    VacancyCreateAPIView,
    UserVacancyListAPIView,
    UpdateVacancyViewStatus,
)
from django.urls import path

urlpatterns = [
    path("vacancies/", UserVacancyListAPIView.as_view()),
    path("vacancy/", VacancyCreateAPIView.as_view()),
    path("vacancy/view/", UpdateVacancyViewStatus.as_view()),
]
