from django.contrib import admin

from ..models.Grade import Grade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    pass
