from django.contrib import admin

from apps.vacancy.models import UserVacancy


@admin.register(UserVacancy)
class UserVacancyAdmin(admin.ModelAdmin):
    list_per_page = 20
