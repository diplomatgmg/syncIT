from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(_):
    """
    Эндпоинт для проверки доступности сервиса.
    Нужен для корректного запуска celery
    """
    return Response({"status": "ok"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health-check/", health_check),
    path("api/", include("apps.user.urls")),
    path("api/", include("apps.hard_skill.urls")),
    path("api/", include("apps.grade.urls")),
    path("api/", include("apps.work_format.urls")),
    path("api/", include("apps.profession.urls")),
    path("api/profile/", include("apps.user_profile.urls")),
    path("api/", include("apps.vacancy.urls")),
]


if settings.DEBUG and not settings.TESTING:
    urlpatterns += (path("__debug__/", include("debug_toolbar.urls")),)
