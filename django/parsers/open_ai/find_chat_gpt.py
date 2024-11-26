# TODO использовать gpt 4 mini
import concurrent.futures
import re
from concurrent.futures import ThreadPoolExecutor

import g4f
import g4f.Provider


def clear_text(text: str):
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str):
    try:
        response = g4f.ChatCompletion.create(
            model="blackbox",
            messages=[{"role": "user", "content": prompt}],
        )
        return clear_text(response)
    except Exception as e:
        print("Unexpected error:", e)
        return None


with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    futures = [
        executor.submit(get_chat_gpt_completion, "Какая ты версия?")
        for _ in range(1000)
    ]
    for future in concurrent.futures.as_completed(futures):
        print(future.result())

# def measure_provider_speed(prompt: str, provider):
#     times = []
#     for _ in range(100000):
#         start_time = time.time()
#         print(get_chat_gpt_completion(prompt, provider), provider)
#         elapsed_time = time.time() - start_time
#         times.append(elapsed_time)
#     return sum(times) / len(times)
#
#
# def get_fastest_providers(prompt: str):
#     provider_times = {}
#     with ThreadPoolExecutor() as executor:
#         for _provider in providers:
#             time_taken = executor.submit(
#                 measure_provider_speed, prompt, _provider
#             ).result()
#             provider_times[_provider] = time_taken
#
#     sorted_providers = sorted(provider_times.items(), key=lambda x: x[1])
#     return sorted_providers
#
#
# prompt = "Привет!"
# fastest_providers = get_fastest_providers(prompt)
# print("Самые быстрые провайдеры:")
# for provider, time_taken in fastest_providers:
#     print(f"{provider}: {time_taken:.2f} секунд")
