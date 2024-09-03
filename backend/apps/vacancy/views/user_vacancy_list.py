from rest_framework import generics

from apps.vacancy.models import UserVacancy
from apps.vacancy.pagination import UserVacancyPagination
from apps.vacancy.serializers import UserVacancyPreviewSerializer


class UserVacancyListAPIView(generics.ListAPIView):
    serializer_class = UserVacancyPreviewSerializer
    pagination_class = UserVacancyPagination

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
            .order_by("is_viewed", "-suitability", "id")
            # Без id меняется порядок вакансий при повторном запросе
        )
