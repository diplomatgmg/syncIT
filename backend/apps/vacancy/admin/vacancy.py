from django.contrib import admin
from django.contrib.admin.filters import SimpleListFilter

from apps.hard_skill.models import HardSkill
from apps.vacancy.models import Vacancy


class HardSkillFilter(SimpleListFilter):
    title = "Hard Skills"
    parameter_name = "hard_skills"

    def lookups(self, request, model_admin):
        return [(skill.id, skill.name) for skill in HardSkill.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(hard_skills__id=self.value())
        return queryset


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "url")
    search_fields = ("name",)
    list_per_page = 20
    list_filter = ("profession__name", HardSkillFilter)
