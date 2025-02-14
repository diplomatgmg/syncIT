from django.contrib import admin

from apps.profession.models import Profession, UnknownProfession


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "order")
    ordering = ("order",)
    search_fields = ("name",)
    search_help_text = "Поиск по name"


@admin.register(UnknownProfession)
class UnknownProfessionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "create_count")
    search_fields = ("name",)
    ordering = ("-create_count",)
