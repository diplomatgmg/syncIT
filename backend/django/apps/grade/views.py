from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from helpers.views import ProxyAPIView


@method_decorator(cache_page(24 * 60 * 60), name="dispatch")
class GradeProxyAPIView(ProxyAPIView):
    proxy_path = "/api/grades"
