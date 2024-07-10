from django.contrib import admin

from .models import Profession


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    pass
