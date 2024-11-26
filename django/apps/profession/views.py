from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics

from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer


@method_decorator(cache_page(600), name="dispatch")  # 10 Минут
class ProfessionListAPIView(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
