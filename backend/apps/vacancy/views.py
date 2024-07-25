from rest_framework import generics

from apps.vacancy.models import Vacancy
from apps.vacancy.serializers import VacancyCreateSerializer


class VacancyCreateAPIView(generics.CreateAPIView):
    serializer_class = VacancyCreateSerializer

    def get_queryset(self):
        return Vacancy.objects.all()
