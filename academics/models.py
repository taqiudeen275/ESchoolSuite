from django.db import models

from users.models import User

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True, null=True)
    # add field for credit hours
    credit_hours = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Class(models.Model):
    name = models.CharField(max_length=50)
    # add field for academic year
    academic_year = models.CharField(max_length=20)  # e.g., 2023/2024
    # add field for class teacher
    class_teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': User.Role.TEACHER}, related_name='classes_taught')
    courses = models.ManyToManyField(Course, related_name='classes')

    class Meta:
        verbose_name_plural = "Classes"

    def __str__(self):
        return self.name