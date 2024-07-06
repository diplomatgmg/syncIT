from django.contrib import admin

from ..models.Profile import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass
