from django.db import models


class CountableManager(models.Manager):
    def create(self, **kwargs):
        """
        Увеличивает create_count в модели при создании такого же экземпляра
        """
        name = kwargs.get("name")
        instance, created = self.get_or_create(name=name)

        if not created:
            instance.create_count += 1

        for attr, value in kwargs.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class CountableModelMixin(models.Model):
    create_count = models.IntegerField(default=1)

    objects = CountableManager()

    class Meta:
        abstract = True
