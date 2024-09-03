from rest_framework.generics import RetrieveAPIView

from apps.user_profile.mixins import ProfileMixin


class ProfileAPIView(ProfileMixin, RetrieveAPIView):
    def get_object(self):
        return self.queryset.get(user=self.request.user)
