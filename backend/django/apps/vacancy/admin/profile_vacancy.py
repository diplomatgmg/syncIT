from django.contrib import admin

from apps.vacancy.models import ProfileVacancy


@admin.register(ProfileVacancy)
class ProfileVacancyAdmin(admin.ModelAdmin):
    list_display = ("profile", "vacancy", "suitability")
    list_per_page = 20
