from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        email = request.data.get("email")

        return Response({"email": email, "token": response.data})


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
