from django.contrib import admin
from django.db.models import Count

from apps.hard_skill.models import HardSkill, UnknownHardSkill


@admin.register(HardSkill)
class HardSkillAdmin(admin.ModelAdmin):
    list_display = ("name", "parent", "selectable", "vacancies_count", "ordering")
    list_filter = ("selectable",)
    raw_id_fields = ("parent",)
    search_fields = ("name",)
    ordering = ("ordering", "-parent")

    def vacancies_count(self, obj):
        return obj.vacancies.count()

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return (
            queryset.annotate(vacancies_count=Count("vacancies"))
            .order_by("-vacancies_count")
            .prefetch_related("parent", "vacancies")
        )

    vacancies_count.short_description = "Количество вакансий"


@admin.register(UnknownHardSkill)
class UnknownHardSkillAdmin(admin.ModelAdmin):
    list_display = ("name", "create_count")
    ordering = ("-create_count",)
