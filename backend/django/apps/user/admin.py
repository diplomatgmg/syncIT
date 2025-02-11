from django.contrib import admin
from django.contrib.auth import get_user_model

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

    def save_model(self, request, obj, form, change):
        obj.set_password(form.cleaned_data["password"])
        obj.save(update_fields=("password",))
