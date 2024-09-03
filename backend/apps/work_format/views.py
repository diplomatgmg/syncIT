from rest_framework import generics

from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer


class WorkFormatListAPIView(generics.ListAPIView):
    queryset = WorkFormat.objects.all()
    serializer_class = WorkFormatSerializer
