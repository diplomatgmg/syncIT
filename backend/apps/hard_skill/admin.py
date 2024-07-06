from django.contrib import admin

from .models import HardSkill


@admin.register(HardSkill)
class HardSkillAdmin(admin.ModelAdmin):
    pass
