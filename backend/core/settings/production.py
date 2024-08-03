from .base import *

DEBUG = False

ALLOWED_HOSTS = ["localhost"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
]
