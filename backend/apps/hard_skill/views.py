from rest_framework.generics import ListAPIView

from .models import HardSkill
from .serializers import (
    HardSkillSerializer,
)


class HardSkillAPIView(ListAPIView):
    queryset = HardSkill.objects.filter(parent__isnull=True)
    serializer_class = HardSkillSerializer
