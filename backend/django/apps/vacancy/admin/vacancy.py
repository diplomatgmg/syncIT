from django.contrib import admin
from django.contrib.admin.filters import SimpleListFilter
from django.utils.html import format_html

from apps.skill.models import Skill
from apps.vacancy.models import Vacancy


class SkillFilter(SimpleListFilter):
    title = "Skills"
    parameter_name = "skills"

    def lookups(self, request, model_admin):
        return [(skill.id, skill.name) for skill in Skill.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(skills__id=self.value())
        return queryset


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("id", "name_link")
    search_fields = ("name",)
    list_per_page = 20
    list_filter = ("profession__name", SkillFilter)
    filter_horizontal = (
        "work_formats",
        "skills",
    )

    @admin.display(description="Название")
    def name_link(self, obj):
        return format_html('<a href="{}" target="_blank">{}</a>', obj.url, obj.name)
