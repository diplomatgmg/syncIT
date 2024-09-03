from apps.hard_skill.models import HardSkill
from apps.hard_skill.serializers import HardSkillRecursiveSerializer
from apps.user_profile.views.profile_attributes_base import ProfileAttributesBaseAPIView


class ProfileHardSkillsAPIView(ProfileAttributesBaseAPIView):
    attribute_model = HardSkill
    attribute_serializer = HardSkillRecursiveSerializer
    attribute_field = "hard_skills"
