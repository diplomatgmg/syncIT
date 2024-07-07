from rest_framework import generics

from .models import Grade
from .serializers import GradeSerializer


class GradeListAPIView(generics.ListAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
