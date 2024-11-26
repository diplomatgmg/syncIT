from django.urls import path
from djoser.views import UserViewSet

from apps.user.views import CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path("token/create/", CustomTokenObtainPairView.as_view()),
    path("token/refresh/", CustomTokenRefreshView.as_view()),
    path("user/register/", UserViewSet.as_view({"post": "create"})),
    path("user/activate/", UserViewSet.as_view({"post": "activation"})),
]
