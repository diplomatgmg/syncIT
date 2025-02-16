from django.core.cache import cache
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Clear the redis cache"

    def handle(self, *args, **options):
        cache.clear()
        self.stdout.write(self.style.SUCCESS("Кеш redis очищен"))
