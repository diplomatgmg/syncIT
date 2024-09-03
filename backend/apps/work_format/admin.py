from django.contrib import admin

from apps.work_format.models import WorkFormat


@admin.register(WorkFormat)
class WorkFormatAdmin(admin.ModelAdmin):
    pass
