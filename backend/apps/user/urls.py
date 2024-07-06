from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

from .views import UserCreateAPIView, CustomTokenObtainPairView

urlpatterns = [
    path("register/", UserCreateAPIView.as_view()),
    path("token/", CustomTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]
