from django.urls import path

from apps.grade.views import GradeListAPIView

urlpatterns = [
    path("grades/", GradeListAPIView.as_view(), name="grade-list"),
]
