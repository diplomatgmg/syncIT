import requests

url = "https://chat.deepseek.com/api/v0/chat/completion"


# stream = Ture
session = requests.Session()

response = session.post(
    url,
    json={
        "prompt": "Hello, how are you?",
        "chat_session_id": "acd077aa-23b5-49e3-8061-77100364180a",
    },
    stream=True,
)

for chunk in response.iter_content(chunk_size=None):
    print(chunk.decode("utf-8"), end="")
