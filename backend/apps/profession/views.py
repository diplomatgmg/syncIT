from rest_framework import generics

from .models import Profession
from .serializers import ProfessionSerializer


class ProfessionListAPIView(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
