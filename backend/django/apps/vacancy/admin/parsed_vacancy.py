from django.contrib import admin

from apps.vacancy.models import ParsedVacancy


@admin.register(ParsedVacancy)
class ParsedVacancyAdmin(admin.ModelAdmin):
    list_display = ("name", "url")
    list_per_page = 20
