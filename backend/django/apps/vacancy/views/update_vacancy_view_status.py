from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.validators import ValidationError

from apps.vacancy.models import ProfileVacancy
from apps.vacancy.serializers import UpdateUserVacancyViewStatusSerializer


class UpdateVacancyViewStatusAPIView(generics.GenericAPIView):
    """
    Представление для обновления статуса просмотра вакансии
    """

    serializer_class = UpdateUserVacancyViewStatusSerializer

    def post(self, request: Request, *args, **kwargs):
        profile_id = self.request.user.profile.id
        vacancy_id = request.data.get("vacancy")

        if not profile_id or not vacancy_id:
            raise ValidationError(
                {"detail": "profile_id and vacancy_id fields are required."}
            )

        profile_vacancy = get_object_or_404(
            ProfileVacancy, profile_id=profile_id, vacancy_id=vacancy_id
        )

        profile_vacancy.is_viewed = True
        profile_vacancy.save(update_fields=("is_viewed",))

        return Response({"status": "success"})
