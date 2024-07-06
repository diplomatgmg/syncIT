from rest_framework import generics

from ..models import HardSkill
from ..serializers.HardSkillSerializer import HardSkillSerializer


class HardSkillListAPIView(generics.ListAPIView):
    queryset = HardSkill.objects.all()
    serializer_class = HardSkillSerializer
