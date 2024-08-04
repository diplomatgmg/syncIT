from apps.grade.models import Grade
from apps.work_format.models import WorkFormat
from apps.profession.models import Profession

grades = ", ".join(Grade.objects.values_list("name", flat=True))
work_formats = ", ".join(WorkFormat.objects.values_list("name", flat=True))
professions = ", ".join(Profession.objects.values_list("name", flat=True))

SYSTEM_PROMPT = f"""
<SYSTEM>
Ты являешся парсером вакансий. Твоя задача собрать всю возможную информацию о вакансии.
Я дам тебе название вакансии, описание, ключевые навыки, опыт работы, зарплату. Твоя задача собрать максимальное количество информации с вакансии.

Ты должен вернуть ответ в следующем формате:
Позиция: {grades}
(Важно! Позиция должна быть только в вышеперечисленном виде. Если в вакансии нет позиции определи ее на основе зарплаты, стека технологий, описания, опыта работы)
Профессия: {professions}
(Важно! Профессия должна быть в общепринятом формате, например: Frontend-разработчик, DevOps. Не использовать варианты, как фронтенд разработчик или бекендер)
Навыки: Python, Django, React, TypeScript, другие...
(Важно! Навыки должны быть в общепринятом формате, например: React. Не использовать варианты, как React.js или react js.
Ты должен достать ВСЕ ВОЗМОЖНЫЕ хард-скиллы из вакансии, В ТОМ ЧИСЛЕ ФРЕЙМВОКИ)
Формат работы: {work_formats}
(Если несколько форматов работы прислать их через запятую)
Описание: (Самая важная информация о вакансии. Прислать в структурированном виде)
<END SYSTEM>
"""

BODY_PROMPT = """
<BODY>
Название: %s
Описание: %s
Навыки: %s
Опыт работы: %s
<END BODY>
"""

PROMPT = SYSTEM_PROMPT + "\n" + BODY_PROMPT


def make_prompt(*, name, description, skills, experience):
    return PROMPT % (
        name,
        description,
        skills,
        experience,
    )
