import logging

from django.core.cache import cache
from django.db.models import Count
from rest_framework import generics

from apps.vacancy.models import ProfileVacancy, Vacancy
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
            .annotate(count_skills=Count("vacancy__hard_skills"))
            .order_by("is_viewed", "-suitability", "-count_skills", "id")
        )

    @staticmethod
    def get_total_vacancies():
        cache_key = "total_vacancies_count"
        total_vacancies = cache.get(cache_key)

        if total_vacancies is None:
            total_vacancies = Vacancy.objects.count()
            cache.set(cache_key, total_vacancies, timeout=60 * 15)

        return total_vacancies

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data["total_vacancies"] = self.get_total_vacancies()

        return response
