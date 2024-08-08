from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "localhost",
    "syncit.space",
]


CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://syncit.space/",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://syncit.space/",
]
