from django.db import models

from students.models import Student
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
    max_students = models.IntegerField(default=30)
    # add fields for time and room
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    room = models.CharField(max_length=50, null=True, blank=True)
    class Meta:
        verbose_name_plural = "Classes"

    def __str__(self):
        return self.name
    
    
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    class_enrolled = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='enrollments', null=True, blank=True)
    enrollment_date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')  # Prevents a student from enrolling in the same course multiple times

    def __str__(self):
        return f"{self.student} - {self.course}"