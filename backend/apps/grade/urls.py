from django.urls import path

from .views import GradeListAPIView

urlpatterns = [
    path("grades/", GradeListAPIView.as_view()),
]
