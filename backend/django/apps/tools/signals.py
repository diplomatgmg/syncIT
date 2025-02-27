from django.core.cache import cache
from django.dispatch import receiver

from core.signals import server_started


@receiver(server_started)
def clear_cache_on_server_start(sender, **kwargs):
    cache.clear()
    print("Кэш redis очищен")
