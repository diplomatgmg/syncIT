from apps.profession.models import Profession
from apps.profession.serializers import ProfessionSerializer
from apps.user_profile.views.profile_attributes_base import ProfileAttributesBaseAPIView


class ProfileProfessionsAPIView(ProfileAttributesBaseAPIView):
    attribute_model = Profession
    attribute_serializer = ProfessionSerializer
    attribute_field = "professions"
