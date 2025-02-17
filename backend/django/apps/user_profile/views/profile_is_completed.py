from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response


class ProfileIsCompletedProxyAPIView(GenericAPIView):
    def get(self, request: Request, *args, **kwargs) -> Response:
        return Response({"is_completed": request.user.profile.is_completed})
