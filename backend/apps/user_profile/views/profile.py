from rest_framework.generics import RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.user_profile.models import Profile
from apps.user_profile.serializers import ProfileSerializer
from rest_framework import status


class ProfileAPIView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.queryset.get(user=self.request.user)

    def put(self, request: Request, *args, **kwargs):  # FIXME рефактор этого говна
        profile = Profile.objects.get(user=request.user)

        professions = request.data.get("professions")
        work_formats = request.data.get("workFormats")
        grades = request.data.get("grades")
        hard_skills = request.data.get("hardSkills")

        if professions:
            profile.professions.clear()
            for profession in professions:
                profile.professions.add(profession.get("id"))

        if work_formats:
            profile.work_formats.clear()
            for work_format in work_formats:
                profile.work_formats.add(work_format.get("id"))

        if grades:
            profile.grades.clear()
            for grade in grades:
                profile.grades.add(grade.get("id"))

        if hard_skills:
            profile.hard_skills.clear()
            for hard_skill in hard_skills:
                profile.hard_skills.add(hard_skill.get("id"))

        return Response(status=status.HTTP_204_NO_CONTENT)
