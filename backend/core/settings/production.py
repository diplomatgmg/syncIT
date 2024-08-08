from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "localhost",
    "syncit.space",
]

CORS_ALLOWED_ORIGINS = [
    "https://localhost",
    "https://syncit.space",
]

CSRF_TRUSTED_ORIGINS = [
    "https://localhost",
    "https://syncit.space",
]

SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
