from django.contrib import admin

from apps.hard_skill.models import HardSkill
from apps.user_profile.models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "is_completed", "user")
    list_filter = ("is_completed", "user")

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "hard_skills":
            kwargs["queryset"] = HardSkill.objects.filter(selectable=True)
        return super().formfield_for_manytomany(db_field, request, **kwargs)
