import time

from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from apps.user_profile.mixins import ProfileMixin
from rest_framework.request import Request

from apps.user_profile.models import Profile


class ProfileAPIView(ProfileMixin, RetrieveAPIView):
    def get_object(self):
        return self.queryset.get(user=self.request.user)

    def put(self, request: Request, *args, **kwargs):  # FIXME рефактор этого говна
        profile = Profile.objects.get(user=request.user)

        professions = request.data.get("professions")
        work_formats = request.data.get("workFormats")
        grades = request.data.get("grades")
        hard_skills = request.data.get("hardSkills")

        profile.professions.clear()
        profile.work_formats.clear()
        profile.grades.clear()
        profile.hard_skills.clear()

        for profession in professions:
            profile.professions.add(profession.get("id"))

        for work_format in work_formats:
            profile.work_formats.add(work_format.get("id"))

        for grade in grades:
            profile.grades.add(grade.get("id"))

        for hard_skill in hard_skills:
            profile.hard_skills.add(hard_skill.get("id"))

        return Response({"status": "ok"})
