from apps.user_profile.views.profile_attributes_base import ProfileAttributesBaseAPIView
from apps.work_format.models import WorkFormat
from apps.work_format.serializers import WorkFormatSerializer


class ProfileWorkFormatsAPIView(ProfileAttributesBaseAPIView):
    attribute_model = WorkFormat
    attribute_serializer = WorkFormatSerializer
    attribute_field = "work_formats"
