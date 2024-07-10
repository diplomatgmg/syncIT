from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver

from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(m2m_changed, sender=Profile.hard_skills.through)
@receiver(m2m_changed, sender=Profile.grades.through)
@receiver(m2m_changed, sender=Profile.work_formats.through)
@receiver(m2m_changed, sender=Profile.professions.through)
def update_is_complete(sender, instance, **kwargs):
    hard_skills_count = instance.hard_skills.count()
    grades_count = instance.grades.count()
    work_formats_count = instance.work_formats.count()
    professions_count = instance.professions.count()

    is_completed = (
        hard_skills_count >= 3
        and grades_count > 0
        and work_formats_count > 0
        and professions_count > 0
    )

    instance.is_completed = is_completed

    instance.save()
