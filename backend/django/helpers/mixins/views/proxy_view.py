import httpx
from django.conf import settings
from django.core.cache import cache
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response


class ProxyAPIMixin:
    """
    Миксин для работы с проксирующими запросами (go).
    """

    need_cache = False

    proxy_path: str = None

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        if not self.proxy_path:
            raise ValueError(
                f"proxy_path не переопределен в классе {self.__class__.__name__}."
            )

    def _get_full_url(self) -> str:
        """
        Формирует полный URL на основе базового URL и относительного пути.
        """

        return f"{settings.PROXY_URL.rstrip('/')}/{self.proxy_path.strip('/')}"

    def get(self, request: Request, *args, **kwargs) -> Response:
        if self.need_cache:
            cache_key = self.__class__.__name__
            cached_data = cache.get(cache_key)

            if cached_data is not None:
                return Response(cached_data)

        url = self._get_full_url()

        try:
            response = httpx.get(url)
            response.raise_for_status()
            if self.need_cache:
                cache.set(cache_key, response.json(), 60 * 60)  # noqa
        except httpx.RequestError as e:
            return Response(
                {
                    "details": str(e),
                    "error": "Ошибка при обращении к проксируемому API.",
                    "url": str(e.request.url),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(response.json())
