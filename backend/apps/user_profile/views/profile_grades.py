from apps.grade.models import Grade
from apps.grade.serializers import GradeSerializer
from apps.user_profile.views.profile_attributes_base import ProfileAttributesBaseAPIView


class ProfileGradesAPIView(ProfileAttributesBaseAPIView):
    attribute_model = Grade
    attribute_serializer = GradeSerializer
    attribute_field = "grades"
