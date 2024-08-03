from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.hard_skill.urls")),
    path("api/", include("apps.grade.urls")),
    path("api/", include("apps.work_format.urls")),
    path("api/", include("apps.profession.urls")),
    path("api/", include("apps.vacancy.urls")),
    path("api/auth/", include("apps.user.urls")),
    path("api/profile/", include("apps.user_profile.urls")),
]


if settings.DEBUG and not settings.TESTING:
    urlpatterns += (path("__debug__/", include("debug_toolbar.urls")),)
