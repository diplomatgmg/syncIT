from django.urls import path

from apps.work_format.views import WorkFormatListAPIView

urlpatterns = [
    path("work_formats/", WorkFormatListAPIView.as_view(), name="work-format-list"),
]
