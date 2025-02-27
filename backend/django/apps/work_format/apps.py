from django.apps import AppConfig


class WorkFormatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.work_format"

    def ready(self):
        import apps.work_format.constants  # noqa Для hotreload
        import apps.work_format.signals  # noqa
