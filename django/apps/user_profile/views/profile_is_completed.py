from rest_framework.generics import RetrieveAPIView

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileIsCompletedSerializer


class ProfileIsCompletedAPIView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileIsCompletedSerializer

    def get_object(self):
        return self.queryset.get(user=self.request.user)
