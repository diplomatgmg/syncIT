from rest_framework.views import APIView

from helpers.mixins.views import ProxyAPIMixin


class ProfileReferenceAPIView(ProxyAPIMixin, APIView):
    proxy_path = "/api/profile/reference"
