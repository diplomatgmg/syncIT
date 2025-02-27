from django.apps import AppConfig

from core.signals import server_started


class ToolsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.tools"

    def ready(self):
        import apps.tools.signals  # noqa

        server_started.send(sender=self.__class__)
