from django.contrib import admin

from ..models.Vacancy import Vacancy


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    pass
