from django.urls import path

from .views import UserCreateAPIView, CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path("token/create/", CustomTokenObtainPairView.as_view()),
    path("token/refresh/", CustomTokenRefreshView.as_view()),
    path("register/", UserCreateAPIView.as_view()),
]
