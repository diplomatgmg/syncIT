from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from helpers.views import ProxyAPIView


@method_decorator(cache_page(600), name="dispatch")  # 10 Минут
class ProfessionProxyAPIView(ProxyAPIView):
    proxy_path = "/api/professions"
