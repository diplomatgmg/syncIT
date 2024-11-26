from rest_framework import generics

from apps.vacancy.models import Vacancy
from apps.vacancy.serializers import VacancyCreateSerializer


class VacancyCreateAPIView(generics.CreateAPIView):
    queryset = Vacancy.objects.all().select_related("hard_skills")
    serializer_class = VacancyCreateSerializer
