from django.contrib.auth import get_user_model
from django.contrib import admin

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # FIXME Пароль не хешируется при изменении через админку
    readonly_fields = ("password",)
