from django.contrib import admin

from .models import Profession, UnknownProfession


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    pass


@admin.register(UnknownProfession)
class UnknownProfessionAdmin(admin.ModelAdmin):
    list_display = ["name", "create_count"]
