from rest_framework import generics

from .models import WorkFormat
from .serializers import WorkFormatSerializer


class WorkFormatListAPIView(generics.ListAPIView):
    queryset = WorkFormat.objects.all()
    serializer_class = WorkFormatSerializer
