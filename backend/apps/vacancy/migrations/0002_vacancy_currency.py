# Generated by Django 5.0.7 on 2024-08-03 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vacancy', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancy',
            name='currency',
            field=models.CharField(default='RUB', max_length=5),
            preserve_default=False,
        ),
    ]