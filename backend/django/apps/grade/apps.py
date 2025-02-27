from django.apps import AppConfig


class GradeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.grade"

    def ready(self):
        import apps.grade.constants  # noqa Для hotreload
        import apps.grade.signals  # noqa
