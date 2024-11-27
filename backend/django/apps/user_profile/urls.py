from django.urls import path

from apps.user_profile.views import *

urlpatterns = [
    path("", ProfileAPIView.as_view(), name="profile"),
    path(
        "is_completed/",
        ProfileIsCompletedProxyAPIView.as_view(),
    ),
]
