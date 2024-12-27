from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import permissions, status

admin.site.index_title = "SyncIT"


def health_check(_):
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


# fmt: off
urlpatterns = [
    path("health-check/", health_check),
    path("robots.txt", TemplateView.as_view(template_name="tools/robots.txt", content_type="text/plain"),),
    path("admin/", admin.site.urls),
    path("api/auth/", include("social_django.urls", namespace="social")),
    path("api/", include("apps.hard_skill.urls")),
    path("api/", include("apps.grade.urls")),
    path("api/", include("apps.work_format.urls")),
    path("api/", include("apps.profession.urls")),
    path("api/", include("apps.vacancy.urls")),
    path("api/", include("apps.user.urls")),
    path("api/profile/", include("apps.user_profile.urls")),
]
# fmt: on


if settings.DEBUG and not settings.TESTING:
    admin.site.site_title = "(DEV)"

    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi

    schema_view = get_schema_view(
        openapi.Info(
            title="Snippets API",
            default_version="v1",
        ),
        public=True,
        permission_classes=[
            permissions.AllowAny,
        ],
    )

    # fmt: off
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path("swagger/",schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui",), # type: ignore
    ]
    # fmt: on
