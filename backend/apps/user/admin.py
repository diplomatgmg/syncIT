from django.contrib.auth import get_user_model
from django.contrib import admin

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "last_login",
        "is_superuser",
        "is_active",
        "is_staff",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_active",
        "is_staff",
        "created_at",
        "updated_at",
    )
    date_hierarchy = "created_at"
    # FIXME Пароль не хешируется при изменении через админку
    readonly_fields = ("password",)
