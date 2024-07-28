from rest_framework import generics

from apps.vacancy.models import Vacancy, UserVacancy
from apps.vacancy.serializers import VacancyCreateSerializer, UserVacancyListSerializer


class UserVacancyListAPIView(generics.ListAPIView):
    serializer_class = UserVacancyListSerializer

    def get_queryset(self):
        return UserVacancy.objects.filter(user=self.request.user)


class VacancyCreateAPIView(generics.CreateAPIView):
    serializer_class = VacancyCreateSerializer

    def get_queryset(self):
        return Vacancy.objects.all()
