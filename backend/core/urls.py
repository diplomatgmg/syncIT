from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from rest_framework import permissions


admin.site.site_title = "(DEV)"
admin.site.index_title = "SyncIT"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.hard_skill.urls")),
    path("api/", include("apps.grade.urls")),
    path("api/", include("apps.work_format.urls")),
    path("api/", include("apps.profession.urls")),
    path("api/", include("apps.vacancy.urls")),
    path("api/", include("apps.user.urls")),
    path("api/profile/", include("apps.user_profile.urls")),
]


if settings.DEBUG and not settings.TESTING:
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

    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        re_path(
            "swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
    ]
