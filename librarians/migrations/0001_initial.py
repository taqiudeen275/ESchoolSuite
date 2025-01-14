# Generated by Django 5.1.4 on 2025-01-06 23:44

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('staff', '0003_staff_salary_payroll'),
        ('students', '0003_admissionapplication_student_parent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('author', models.CharField(max_length=255)),
                ('isbn', models.CharField(max_length=20, unique=True)),
                ('publisher', models.CharField(max_length=255)),
                ('publication_year', models.IntegerField()),
                ('genre', models.CharField(max_length=50)),
                ('copies_available', models.IntegerField(default=0)),
                ('total_copies', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='BorrowingRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('borrow_date', models.DateField(default=django.utils.timezone.now)),
                ('due_date', models.DateField()),
                ('return_date', models.DateField(blank=True, null=True)),
                ('status', models.CharField(choices=[('Borrowed', 'Borrowed'), ('Returned', 'Returned'), ('Overdue', 'Overdue')], default='Borrowed', max_length=20)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrowing_records', to='librarians.book')),
                ('staff', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='borrowed_books', to='staff.staff')),
                ('student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='borrowed_books', to='students.student')),
            ],
            options={
                'unique_together': {('book', 'student', 'borrow_date')},
            },
        ),
    ]
