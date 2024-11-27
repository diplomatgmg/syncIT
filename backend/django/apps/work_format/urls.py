from django.urls import path

from apps.work_format.views import WorkFormatProxyAPIView

urlpatterns = [
    path("work_formats/", WorkFormatProxyAPIView.as_view(), name="work-format-list"),
]
