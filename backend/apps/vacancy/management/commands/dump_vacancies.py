from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.serializers import serialize
import json

from apps.vacancy.models import Vacancy, Company, Grade, Profession, WorkFormat


class Command(BaseCommand):
    help = f"Создает дампы для моделей вакансий в директорию {settings.FIXTURE_DIR}"

    @staticmethod
    def dump_model(model, file_name):
        data = json.loads(serialize("json", model.objects.all()))
        with open(
            f"{settings.FIXTURE_DIR}/{file_name}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def handle(self, *args, **kwargs):
        self.dump_model(Company, "companies")
        self.dump_model(Grade, "grades")
        self.dump_model(Profession, "professions")
        self.dump_model(WorkFormat, "work_formats")

        vacancy_models = (
            Vacancy.objects.all()
            .prefetch_related("work_formats", "hard_skills")
            .select_related("company", "grade", "profession")
        )
        vacancies_data = []

        for vacancy in vacancy_models:
            data = {
                "model": "vacancy.Vacancy",
                "pk": vacancy.pk,
                "fields": {
                    "unique_hash": vacancy.unique_hash,
                    "name": vacancy.name,
                    "description": vacancy.description,
                    "salary_from": vacancy.salary_from,
                    "salary_to": vacancy.salary_to,
                    "currency": vacancy.currency,
                    "experience": vacancy.experience,
                    "url": vacancy.url,
                    "company": vacancy.company.pk,
                    "grade": vacancy.grade.pk,
                    "work_formats": [wf.pk for wf in vacancy.work_formats.all()],
                    "hard_skills": [hs.pk for hs in vacancy.hard_skills.all()],
                    "profession": vacancy.profession.pk,
                    "created_at": str(vacancy.created_at),
                    "published_at": str(vacancy.published_at),
                },
            }

            vacancies_data.append(data)

        with open(f"{settings.FIXTURE_DIR}/vacancies.json", "w", encoding="utf-8") as f:
            json.dump(vacancies_data, f, ensure_ascii=False, indent=2)
