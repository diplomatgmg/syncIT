import logging

from rest_framework import generics

from apps.vacancy.models import ProfileVacancy
from apps.vacancy.pagination import UserVacancyPagination
from apps.vacancy.serializers import UserVacancyPreviewSerializer

logger = logging.getLogger("django")


class UserVacancyListAPIView(generics.ListAPIView):
    serializer_class = UserVacancyPreviewSerializer
    pagination_class = UserVacancyPagination

    def get_queryset(self):
        return (
            ProfileVacancy.objects.filter(profile=self.request.user.profile)
            .select_related(
                "vacancy", "vacancy__profession", "vacancy__grade", "vacancy__company"
            )
            .prefetch_related(
                "vacancy__hard_skills",
                "vacancy__work_formats",
            )
            .order_by("is_viewed", "-suitability", "id")
            # Без id меняется порядок вакансий при повторном запросе
        )
