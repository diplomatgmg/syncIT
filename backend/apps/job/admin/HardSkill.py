from django.contrib import admin

from ..models.HardSkill import HardSkill


@admin.register(HardSkill)
class HardSkillAdmin(admin.ModelAdmin):
    pass
