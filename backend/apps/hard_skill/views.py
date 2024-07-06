from rest_framework import generics

from .models import HardSkill
from .serializers import HardSkillSerializer


class HardSkillListAPIView(generics.ListAPIView):
    queryset = HardSkill.objects.all()
    serializer_class = HardSkillSerializer
