from rest_framework.generics import CreateAPIView
from .serializers import UserCreateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = []


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        email = request.data.get("email")

        return Response({"email": email, "token": response.data})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, *args, **kwargs) -> Response:
        response = super().post(*args, **kwargs)

        return Response({"token": response.data})
