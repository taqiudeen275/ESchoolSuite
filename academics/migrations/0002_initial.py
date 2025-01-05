# Generated by Django 5.1.4 on 2025-01-05 21:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('academics', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='class_teacher',
            field=models.ForeignKey(blank=True, limit_choices_to={'role': 'TEACHER'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='classes_taught', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='class',
            name='courses',
            field=models.ManyToManyField(related_name='classes', to='academics.course'),
        ),
    ]
