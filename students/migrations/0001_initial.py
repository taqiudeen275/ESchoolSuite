# Generated by Django 5.1.4 on 2025-01-05 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.CharField(max_length=20, unique=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('middle_name', models.CharField(blank=True, max_length=50, null=True)),
                ('date_of_birth', models.DateField()),
                ('gender', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=50)),
                ('region', models.CharField(max_length=50)),
                ('nationality', models.CharField(default='Ghanaian', max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('admission_number', models.CharField(max_length=20, unique=True)),
                ('admission_date', models.DateField()),
                ('emergency_contact_name', models.CharField(max_length=100)),
                ('emergency_contact_phone', models.CharField(max_length=20)),
                ('emergency_contact_relationship', models.CharField(max_length=50)),
                ('medical_conditions', models.TextField(blank=True, null=True)),
                ('allergies', models.TextField(blank=True, null=True)),
                ('previous_school_name', models.CharField(blank=True, max_length=100, null=True)),
                ('previous_school_address', models.CharField(blank=True, max_length=255, null=True)),
                ('previous_school_contact', models.CharField(blank=True, max_length=20, null=True)),
                ('religion', models.CharField(blank=True, max_length=50, null=True)),
                ('denomination', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]
