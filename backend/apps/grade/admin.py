from django.contrib import admin

from apps.grade.models import Grade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
