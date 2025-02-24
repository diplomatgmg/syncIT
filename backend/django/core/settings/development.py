from core.settings.base import *  # noqa

DEBUG = True

DJOSER["EMAIL_FRONTEND_PROTOCOL"] = "http"

SHELL_PLUS = "ipython"
RUNSERVERPLUS_POLLER_RELOADER_INTERVAL = 0

ALLOWED_HOSTS = ["*"]


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]


if not TESTING:
    INSTALLED_APPS += [
        "debug_toolbar",
        "django_extensions",
        "drf_yasg",
    ]

    MIDDLEWARE += [
        "debug_toolbar.middleware.DebugToolbarMiddleware",
    ]


DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda _: True,
}


SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(seconds=3)
#
# CACHES = {
#     "default": {
#         "BACKEND": "django.core.cache.backends.dummy.DummyCache",
#     }
# }
