from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class ProfessionProxyAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/professions"
