from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileSerializer
from apps.user_profile.tasks import find_suitable_vacancies_for_profiles
from helpers.mixins.views import ProxyAPIMixin


class ProfileAPIView(ProxyAPIMixin, RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    proxy_path = "/api/profile/{}"

    def get(self, request: Request, *args, **kwargs) -> Response:
        self.proxy_path = self.proxy_path.format(request.user.profile.id)
        return super().get(request, *args, **kwargs)

    def get_object(self):
        return self.get_queryset().get(user=self.request.user)

    def get_queryset(self):
        return Profile.objects.all().prefetch_related(
            "skills", "grades", "work_formats", "professions"
        )

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        data = request.data

        fields_to_update = {
            "professions": profile.professions,
            "workFormats": profile.work_formats,
            "grades": profile.grades,
            "skills": profile.skills,
        }

        for field_name, related_manager in fields_to_update.items():
            field_value = data.get(field_name)
            if field_value is not None:
                related_manager.set([item["id"] for item in field_value])

        find_suitable_vacancies_for_profiles.apply_async(
            kwargs={"profile_ids": [profile.id]}
        )

        profile = self.get_object()
        serializer = self.get_serializer(profile)

        return Response(serializer.data)
