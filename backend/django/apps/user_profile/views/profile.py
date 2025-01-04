from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileSerializer
from apps.user_profile.tasks import find_suitable_vacancies_for_profiles


class ProfileAPIView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        return self.queryset.get(profile=profile)

    def put(self, request: Request, *args, **kwargs):
        profile = self.get_object()
        data = request.data

        fields_to_update = {
            "professions": "professions",
            "workFormats": "work_formats",
            "grades": "grades",
            "hardSkills": "hard_skills",
        }

        for field_name, attr_name in fields_to_update.items():
            field_value = data.get(field_name)

            if field_value is not None:
                getattr(profile, attr_name).clear()
                for item in field_value:
                    getattr(profile, attr_name).add(item.get("id"))

        profile.save()
        find_suitable_vacancies_for_profiles.apply_async(
            kwargs={"profile_ids": [profile.id]}
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
