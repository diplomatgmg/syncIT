from django.urls import path

from apps.profession.views import ProfessionProxyAPIView

urlpatterns = [
    path("professions/", ProfessionProxyAPIView.as_view(), name="profession-list"),
]
