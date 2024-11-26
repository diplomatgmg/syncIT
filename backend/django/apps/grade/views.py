import requests

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework.views import APIView


@method_decorator(cache_page(600), name="dispatch")  # 10 Минут
class GradeProxyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        response = requests.get('http://go:8080/api/grades')
        response.raise_for_status()
        return Response(response.json())
