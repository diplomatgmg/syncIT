from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "localhost",
    "188.124.39.234",
]


CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://188.124.39.234",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://188.124.39.234",
]
