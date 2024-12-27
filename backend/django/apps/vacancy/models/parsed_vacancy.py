from apps.vacancy.models import BaseVacancy


class ParsedVacancy(BaseVacancy):
    """
    Вакансия, которая была спарсена и не подошла по критериям
    """
