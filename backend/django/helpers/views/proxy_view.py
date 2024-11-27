import requests
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from django.conf import settings


class ProxyAPIView(APIView):
    """
    Миксин для работы с проксирующими запросами (go).
    """

    proxy_path: str = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if not self.proxy_path:
            raise ValueError(
                f"proxy_path не переопределен в классе {self.__class__.__name__}."
            )

    def get_full_url(self) -> str:
        """
        Формирует полный URL на основе базового URL и относительного пути.
        """

        return f"{settings.PROXY_URL.rstrip('/')}/{self.proxy_path.strip('/')}"

    def get(self, request: Request, *args, **kwargs) -> Response:
        url = self.get_full_url()

        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.RequestException as e:
            return Response(
                {
                    "error": "Ошибка при обращении к проксируемому API.",
                    "details": str(e),
                },
                status=502,
            )

        return Response(response.json())
