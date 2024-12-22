from django.conf import settings
from django.shortcuts import redirect
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.user.serializers import UserCreateSerializer


def generate_tokens(user):
    """
    Генерирует и возвращает access и refresh токены для пользователя.
    """
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),  # type: ignore
        "refresh": str(refresh),
        "email": user.email,
    }


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


def social_success_auth(strategy, details, user=None, *args, **kwargs):
    """
    Обрабатывает успешный вход через Social, генерируя токены для аутентифицированного пользователя.
    """
    host = "http://localhost:3000" if settings.DEBUG else ""

    if user:
        user.is_active = True
        user.save()

        tokens = generate_tokens(user)
        redirect_url = f"{host}/login?access={tokens['access']}&refresh={tokens['refresh']}&email={user.email}"
        return redirect(redirect_url)

    return redirect(host)
