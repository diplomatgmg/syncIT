from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from social_django.models import UserSocialAuth

User = get_user_model()


@receiver(post_save, sender=UserSocialAuth)
def create_user(sender, instance: UserSocialAuth, created, **kwargs):
    if created:
        User.objects.create(email=instance.user.email, password=make_password(None))
