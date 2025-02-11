from django.contrib import admin
from django.db.models import Count

from apps.hard_skill.models import HardSkill, UnknownHardSkill


@admin.register(HardSkill)
class HardSkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "parent",
        "selectable",
        "vacancies_count",
        "profiles_count",
        "ordering",
    )
    list_filter = ("selectable",)
    raw_id_fields = ("parent",)
    search_fields = ("name",)
    ordering = ("ordering", "-parent", "name")

    @admin.display(description="Количество вакансий", ordering="vacancies_count")
    def vacancies_count(self, obj: HardSkill):
        return obj.vacancies.count() if obj.selectable else "-"

    @admin.display(description="Количество профилей", ordering="profiles_count")
    def profiles_count(self, obj: HardSkill):
        return obj.profiles.count()

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return (
            queryset.annotate(
                vacancies_count=Count("vacancies"), profiles_count=Count("profiles")
            )
            .order_by("-vacancies_count")
            .prefetch_related("parent", "vacancies")
        )


@admin.register(UnknownHardSkill)
class UnknownHardSkillAdmin(admin.ModelAdmin):
    list_display = ("name", "create_count")
    ordering = ("-create_count",)
    search_fields = ("name",)
