from django.contrib import admin

from apps.skill.models import Skill
from apps.user_profile.models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "is_completed")
    list_filter = ("is_completed", "user")

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "skills":
            kwargs["queryset"] = Skill.objects.filter(selectable=True)
        return super().formfield_for_manytomany(db_field, request, **kwargs)
