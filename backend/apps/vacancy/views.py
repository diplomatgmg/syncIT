from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.validators import ValidationError

from apps.vacancy.models import Vacancy, UserVacancy
from apps.vacancy.serializers import (
    VacancyCreateSerializer,
    UserVacancyListSerializer,
    UpdateUserVacancyViewStatusSerializer,
)


class UserVacancyListAPIView(generics.ListAPIView):
    serializer_class = UserVacancyListSerializer

    def get_queryset(self):
        return (
            UserVacancy.objects.filter(user=self.request.user)
            .prefetch_related(
                "vacancy",
                "vacancy__company",
                "vacancy__grade",
                "vacancy__profession",
                "vacancy__hard_skills",
            )
            .order_by("is_viewed", "-suitability")
        )


class UpdateVacancyViewStatus(generics.GenericAPIView):
    """
    Представление для обновления статуса просмотра вакансии
    """

    serializer_class = UpdateUserVacancyViewStatusSerializer

    def post(self, request, *args, **kwargs):
        user_id = self.request.user.id
        vacancy_id = request.data.get("vacancy")

        if not user_id or not vacancy_id:
            raise ValidationError({"detail": "user and vacancy fields are required."})

        user_vacancy = get_object_or_404(
            UserVacancy, user_id=user_id, vacancy_id=vacancy_id
        )

        user_vacancy.is_viewed = True
        user_vacancy.save()

        return Response({"status": "success"})


class VacancyCreateAPIView(generics.CreateAPIView):
    queryset = Vacancy.objects.all().select_related("hard_skills")
    serializer_class = VacancyCreateSerializer
