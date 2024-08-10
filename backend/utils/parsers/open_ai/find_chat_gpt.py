# TODO использовать gpt 4 mini
import re
import time
from concurrent.futures import ThreadPoolExecutor

import g4f
import g4f.Provider


providers = [
    # g4f.Provider.Allyfy,
    # g4f.Provider.DDG,
    g4f.Provider.GeminiProChat,
]


def clear_text(text: str):
    return re.sub(r"\*+", " ", text).strip()


def get_chat_gpt_completion(prompt: str, provider):
    try:
        response = g4f.ChatCompletion.create(
            model="gpt-4o",
            provider=provider,
            messages=[{"role": "user", "content": prompt}],
        )
        return clear_text(response)
    except Exception as e:
        print("Unexpected error:", e)
        return None


def measure_provider_speed(prompt: str, provider):
    times = []
    for _ in range(10):
        start_time = time.time()
        print(get_chat_gpt_completion(prompt, provider), provider)
        elapsed_time = time.time() - start_time
        times.append(elapsed_time)
    return sum(times) / len(times)


def get_fastest_providers(prompt: str):
    provider_times = {}
    with ThreadPoolExecutor() as executor:
        for _provider in providers:
            time_taken = executor.submit(
                measure_provider_speed, prompt, _provider
            ).result()
            provider_times[_provider] = time_taken

    sorted_providers = sorted(provider_times.items(), key=lambda x: x[1])
    return sorted_providers


prompt = "Привет!"
fastest_providers = get_fastest_providers(prompt)
print("Самые быстрые провайдеры:")
for provider, time_taken in fastest_providers:
    print(f"{provider}: {time_taken:.2f} секунд")
