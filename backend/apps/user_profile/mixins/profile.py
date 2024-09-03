from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileSerializer


class ProfileMixin:
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
