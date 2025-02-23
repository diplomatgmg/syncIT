from django.core.cache import cache
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class ProfileReferenceAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/profile/reference"

    def get(self, request: Request, *args, **kwargs) -> Response:
        cache_key = "profile_reference"
        cached_data = cache.get(cache_key)

        if cached_data is not None:
            return Response(cached_data)

        response = super().get(request, *args, **kwargs)
        cache.set(cache_key, response.data, 60 * 15)

        return response
