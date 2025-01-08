# Generated by Django 5.1.4 on 2025-01-08 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communications', '0002_bulkmessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='bulkmessage',
            name='custom_recipients',
            field=models.TextField(blank=True, help_text='Enter recipient emails or phone numbers separated by commas or newlines.', null=True),
        ),
    ]
