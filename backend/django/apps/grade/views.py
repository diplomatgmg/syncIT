from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class GradeProxyAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/grades"
    need_cache = True
