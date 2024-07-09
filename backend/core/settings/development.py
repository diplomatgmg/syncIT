from .base import *
import sys

TESTING = "test" in sys.argv

ALLOWED_HOSTS = ["*"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]


INSTALLED_APPS = [
    *INSTALLED_APPS,
    "debug_toolbar" if not TESTING else None,
    "django_extensions",
]
INSTALLED_APPS = [app for app in INSTALLED_APPS if app]

MIDDLEWARE = [
    *MIDDLEWARE,
    "debug_toolbar.middleware.DebugToolbarMiddleware" if not TESTING else None,
]
MIDDLEWARE = [middleware for middleware in MIDDLEWARE if middleware]


DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda _: True,
}


SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(days=365)
