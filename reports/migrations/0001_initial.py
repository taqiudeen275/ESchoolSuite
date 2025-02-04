# Generated by Django 5.1.4 on 2025-01-08 10:02

import cloudinary.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0003_admissionapplication_student_parent'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReportCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('term', models.CharField(max_length=50)),
                ('academic_year', models.CharField(max_length=20)),
                ('generated_date', models.DateTimeField(auto_now_add=True)),
                ('pdf_file', cloudinary.models.CloudinaryField(max_length=255, verbose_name='report_card_pdf')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report_cards', to='students.student')),
            ],
        ),
    ]
