from django.urls import path

from apps.user_profile.views import *

urlpatterns = [
    path("", ProfileAPIView.as_view(), name="profile"),
    path("reference/", ProfileReferenceAPIView.as_view(), name="profile-reference"),
    path(
        "is_completed/",
        ProfileIsCompletedProxyAPIView.as_view(),
        name="profile-is-completed",
    ),
]
