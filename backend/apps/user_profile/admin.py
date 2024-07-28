from django.contrib import admin

from .models import Profile
from ..hard_skill.models import HardSkill


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "hard_skills":
            kwargs["queryset"] = HardSkill.objects.filter(selectable=True)
        return super().formfield_for_manytomany(db_field, request, **kwargs)
