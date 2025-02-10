from django.contrib import admin
from django.utils.html import format_html

from apps.vacancy.models import ParsedVacancy


@admin.register(ParsedVacancy)
class ParsedVacancyAdmin(admin.ModelAdmin):
    list_display = ("id", "name_link")
    readonly_fields = ("created_at",)
    list_per_page = 20

    @admin.display
    def name_link(self, obj):
        return format_html('<a href="{}" target="_blank">{}</a>', obj.url, obj.name)
