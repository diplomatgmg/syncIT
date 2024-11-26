import hashlib


def generate_hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()
