import random


def get_chat_gpt_completion():
    ans1 = None
    ans2 = {
        "name": "Вакансия",
        "hard_skills": random.choice([[1, 2, 3], [3, 4], [5, 6]]),
    }
    return random.choice([ans1, ans2])


parsed_vacancy = {}

for _ in range(5):
    parsed_gpt_result = get_chat_gpt_completion()
    while parsed_gpt_result is None:
        parsed_gpt_result = get_chat_gpt_completion()

    if len(parsed_vacancy) == 0:
        parsed_vacancy.update(parsed_gpt_result)
    else:
        parsed_vacancy["hard_skills"].extend(parsed_gpt_result["hard_skills"])

print(parsed_vacancy)
#
# vacancy_gpt_result = get_chat_gpt_completion(vacancy_prompt)
# parsed_vacancy = self.parse_vacancy(vacancy_gpt_result)
#
# # TODO Сделать пропмт 5 раз, чтобы получить наибольшее количество полезной инфа
# while parsed_vacancy is None:
#     print("=== Повторяю запрос ===")
#     vacancy_gpt_result = get_chat_gpt_completion(vacancy_prompt)
#     parsed_vacancy = self.parse_vacancy(vacancy_gpt_result)
#
# if len(parsed_vacancy["hard_skill_names"]) < 5:
#     print("Мало скиллов, скипаем")
#     continue
