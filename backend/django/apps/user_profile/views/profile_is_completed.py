from rest_framework.request import Request
from rest_framework.response import Response

from helpers.views import ProxyAPIView


class ProfileIsCompletedProxyAPIView(ProxyAPIView):
    proxy_path = "api/profile/{}/is_completed"

    def get(self, request: Request, *args, **kwargs) -> Response:
        self.proxy_path = self.proxy_path.format(request.user.id)
        return super().get(request, *args, **kwargs)
