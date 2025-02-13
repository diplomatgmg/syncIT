from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileSerializer
from apps.user_profile.tasks import find_suitable_vacancies_for_profiles


class ProfileAPIView(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.get_queryset().get(user=self.request.user)

    def get_queryset(self):
        return Profile.objects.all().prefetch_related(
            "hard_skills", "grades", "work_formats", "professions"
        )

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        data = request.data

        fields_to_update = {
            "professions": profile.professions,
            "workFormats": profile.work_formats,
            "grades": profile.grades,
            "hardSkills": profile.hard_skills,
        }

        for field_name, related_manager in fields_to_update.items():
            field_value = data.get(field_name)
            if field_value is not None:
                related_manager.set([item["id"] for item in field_value])

        find_suitable_vacancies_for_profiles.apply_async(
            kwargs={"profile_ids": [profile.id]}
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
