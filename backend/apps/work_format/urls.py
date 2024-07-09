from django.urls import path

from .views import WorkFormatListAPIView

urlpatterns = [
    path("work_formats/", WorkFormatListAPIView.as_view()),
]
