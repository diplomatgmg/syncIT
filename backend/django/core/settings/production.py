from core.settings.base import *  # noqa

DEBUG = False

ALLOWED_HOSTS = [
    "0.0.0.0",
    "localhost",
    "94.26.236.166",
    "syncit.space",
]

CORS_ALLOWED_ORIGINS = [
    "https://syncit.space",
]

CSRF_TRUSTED_ORIGINS = [
    "https://syncit.space",
]

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
