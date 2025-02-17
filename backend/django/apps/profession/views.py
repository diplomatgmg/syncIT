from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


@method_decorator(cache_page(24 * 60 * 60), name="dispatch")
class ProfessionProxyAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/professions"
