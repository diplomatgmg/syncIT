from rest_framework import serializers

from apps.user_profile.models import Profile


class ProfileIsCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("is_completed",)
