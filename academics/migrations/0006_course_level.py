# Generated by Django 5.1.4 on 2025-01-06 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academics', '0005_gradingscale_gradecomponent_grade_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='level',
            field=models.CharField(blank=True, choices=[('PRIMARY', 'Primary'), ('JHS', 'Junior High School'), ('SHS', 'Senior High School'), ('UNIVERSITY', 'University')], max_length=20, null=True),
        ),
    ]
