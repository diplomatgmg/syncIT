from django.contrib import admin

from .models import HardSkill, UnknownHardSkill


@admin.register(HardSkill)
class HardSkillAdmin(admin.ModelAdmin):
    list_display = ("name", "vacancies_count")

    def vacancies_count(self, obj):
        return obj.vacancies.count()

    vacancies_count.short_description = "Количество вакансий"


@admin.register(UnknownHardSkill)
class UnknownHardSkillAdmin(admin.ModelAdmin):
    list_display = ["name", "create_count"]
