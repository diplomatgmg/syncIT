from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class WorkFormatProxyAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/work_formats"
