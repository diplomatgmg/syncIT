from rest_framework.generics import ListAPIView

from .models import HardSkill
from .serializers import (
    HardSkillRecursiveSerializer,
)


# @method_decorator(cache_page(60), name="dispatch")
class HardSkillAPIView(ListAPIView):
    queryset = HardSkill.objects.filter(parent__isnull=True)
    serializer_class = HardSkillRecursiveSerializer
