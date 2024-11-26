from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.validators import ValidationError

from apps.vacancy.models import UserVacancy
from apps.vacancy.serializers import UpdateUserVacancyViewStatusSerializer


class UpdateVacancyViewStatusAPIView(generics.GenericAPIView):
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
