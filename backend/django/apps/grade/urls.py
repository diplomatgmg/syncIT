from django.urls import path

from apps.grade.views import GradeProxyAPIView

urlpatterns = [
    path("grades/", GradeProxyAPIView.as_view(), name="grade-list"),
]
