from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class SkillProxyAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/skills"
    need_cache = True
