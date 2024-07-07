from django.urls import path

from .views import UserCreateAPIView, CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path("register/", UserCreateAPIView.as_view()),
    path("token/", CustomTokenObtainPairView.as_view()),
    path("token/refresh/", CustomTokenRefreshView.as_view()),
]
