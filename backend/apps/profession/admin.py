from django.contrib import admin

from .models import Profession, UnknownProfession


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(UnknownProfession)
class UnknownProfessionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "create_count")
    search_fields = ("name",)
