from rest_framework import generics

from apps.vacancy.models import Vacancy, UserVacancy
from apps.vacancy.serializers import VacancyCreateSerializer, UserVacancyListSerializer


class UserVacancyListAPIView(generics.ListAPIView):
    serializer_class = UserVacancyListSerializer

    def get_queryset(self):
        # TODO Убрать обработку релевантности вакансий с бекенда и перенести сюда
        return UserVacancy.objects.filter(user=self.request.user).prefetch_related(
            "vacancy",
            "vacancy__company",
            "vacancy__grade",
            "vacancy__profession",
            "vacancy__hard_skills",
        )


class VacancyCreateAPIView(generics.CreateAPIView):
    queryset = Vacancy.objects.all().select_related("hard_skills")
    serializer_class = VacancyCreateSerializer
