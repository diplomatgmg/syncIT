# Generated by Django 5.0.6 on 2024-07-07 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grade', '0001_initial'),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='grades',
            field=models.ManyToManyField(related_name='profiles', to='grade.grade'),
        ),
    ]