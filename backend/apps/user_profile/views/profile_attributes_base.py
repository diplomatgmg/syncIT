from rest_framework.generics import GenericAPIView

from apps.user_profile.mixins import ProfileMixin, ProfileAttributesMixin


class ProfileAttributesBaseAPIView(
    ProfileMixin, ProfileAttributesMixin, GenericAPIView
):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.attribute_model is None:
            raise TypeError("attribute_model must be defined.")

        if self.attribute_serializer is None:
            raise TypeError("attribute_serializer must be defined.")

        if self.attribute_field is None:
            raise TypeError("attribute_field must be defined.")
