from django.contrib import admin

from .models import WorkFormat


@admin.register(WorkFormat)
class WorkFormatAdmin(admin.ModelAdmin):
    pass
