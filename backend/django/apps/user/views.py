from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.utils.timezone import now
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.user.serializers import UserCreateSerializer

User = get_user_model()


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

        user = User.objects.get(email=email)
        user.last_login = now()
        user.save(update_fields=("last_login",))

        return Response({"email": email, "token": response.data})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)

        token = AccessToken(response.data["access"])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        user.last_login = now()
        user.save(update_fields=("last_login",))

        return Response({"token": response.data})


def social_success_auth(strategy, details, user=None, *args, **kwargs):
    """
    Обрабатывает успешный вход через Social, генерируя токены для аутентифицированного пользователя.
    """
    domain = "http" if settings.DEBUG else "https"
    host = settings.DOMAIN
    url = f"{domain}://{host}"

    if user:
        user.is_active = True
        user.last_login = now()
        user.save(update_fields=("is_active", "last_login"))

        tokens = generate_tokens(user)
        redirect_url = f"{url}/login?access={tokens['access']}&refresh={tokens['refresh']}&email={user.email}"
        return redirect(redirect_url)

    return redirect(url)
