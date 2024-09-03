from rest_framework.generics import RetrieveAPIView

from apps.user_profile.mixins import ProfileMixin
from apps.user_profile.serializers import ProfileIsCompletedSerializer


class ProfileIsCompletedAPIView(ProfileMixin, RetrieveAPIView):
    serializer_class = ProfileIsCompletedSerializer

    def get_object(self):
        return self.queryset.get(user=self.request.user)
