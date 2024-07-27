from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.generics import ListAPIView

from .models import HardSkill
from .serializers import (
    HardSkillSerializer,
)


@method_decorator(cache_page(60), name="dispatch")
class HardSkillAPIView(ListAPIView):
    queryset = HardSkill.objects.filter(parent__isnull=True)
    serializer_class = HardSkillSerializer
