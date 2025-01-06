# Generated by Django 5.1.4 on 2025-01-06 14:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academics', '0003_class_end_time_class_max_students_class_room_and_more'),
        ('students', '0003_admissionapplication_student_parent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('PRESENT', 'Present'), ('ABSENT', 'Absent'), ('LATE', 'Late'), ('EXCUSED', 'Excused')], default='PRESENT', max_length=20)),
                ('remark', models.TextField(blank=True, null=True)),
                ('class_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendance_records', to='academics.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendance_records', to='students.student')),
            ],
            options={
                'unique_together': {('student', 'class_session', 'date')},
            },
        ),
    ]