from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from students.models import Student
from users.models import User
from django.db.models import Sum, Avg, F, ExpressionWrapper, DecimalField
from django.core.exceptions import ValidationError


class GradingScale(models.Model):
    class Level(models.TextChoices):
        PRIMARY = 'PRIMARY', 'Primary'
        JHS = 'JHS', 'Junior High School'
        SHS = 'SHS', 'Senior High School'
        UNIVERSITY = 'UNIVERSITY', 'University'

    name = models.CharField(max_length=50)  # e.g., "BECE", "WASSCE", "University of Ghana - 4.0 Scale"
    level = models.CharField(max_length=20, choices=Level.choices)  # Educational level
    grades = models.JSONField()  # Store grades and their meanings as JSON
    # Add a field to indicate if the scale is currently active or not
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.level})"
    


class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True, null=True)
    level = models.CharField(max_length=20, choices=GradingScale.Level.choices,null=True, blank=True)
    credit_hours = models.IntegerField(default=0)
    grading_scale = models.ForeignKey(GradingScale, on_delete=models.SET_NULL, null=True, blank=True)

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
    
    

class Attendance(models.Model):
    class AttendanceStatus(models.TextChoices):
        PRESENT = 'PRESENT', 'Present'
        ABSENT = 'ABSENT', 'Absent'
        LATE = 'LATE', 'Late'
        EXCUSED = 'EXCUSED', 'Excused'

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance_records')
    # Assuming attendance is taken per class (you might need to adjust this based on your specific requirements)
    class_session = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=AttendanceStatus.choices, default=AttendanceStatus.PRESENT)
    remark = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'class_session', 'date')  # Prevents duplicate attendance records

    def __str__(self):
        return f"{self.student} - {self.class_session} - {self.date} - {self.status}"
    
   
class GradeComponent(models.Model):
    class ComponentType(models.TextChoices):
        QUIZ = 'QUIZ', 'Quiz'
        ASSIGNMENT = 'ASSIGNMENT', 'Assignment'
        MIDSEM = 'MIDSEM', 'Mid-Semester Exam'
        EXAM = 'EXAM', 'Final Exam'

    name = models.CharField(max_length=50)  # e.g., "Quiz 1", "Assignment 2", "Mid-Semester Exam", "Final Exam"
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='grade_components')
    component_type = models.CharField(max_length=20, choices=ComponentType.choices)
    max_score = models.DecimalField(max_digits=5, decimal_places=2, default=100.00, validators=[
            MinValueValidator(0, message="Score cannot be less than 0."),
            MaxValueValidator(100, message="Score cannot be greater than 100.")
        ])  # Maximum possible score for this component
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, validators=[
            MinValueValidator(0, message="Weight cannot be less than 0."),
            MaxValueValidator(100, message="Weight cannot be greater than 100.")
        ]) # Weight of the component towards the CA or final grade (e.g., 0.2 for 20%)
    grading_scale = models.ForeignKey(GradingScale, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.course.name} - {self.name}"

class Score(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='scores')
    component = models.ForeignKey(GradeComponent, on_delete=models.CASCADE, related_name='scores')
    score = models.DecimalField(max_digits=5, decimal_places=2, validators=[
            MinValueValidator(0, message="Score cannot be less than 0."),
            MaxValueValidator(100, message="Score cannot be greater than 100.")
        ])
    date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'component')

    def __str__(self):
        return f"{self.student} - {self.component} - {self.score}"
    
    def save(self, *args, **kwargs):
        # Ensure the score does not exceed the max_score for the component
        if self.score > self.component.max_score:
            raise ValidationError(f"Score cannot exceed the maximum score ({self.component.max_score}) for this component.")
        super().save(*args, **kwargs)

class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='grades')
    grading_scale = models.ForeignKey(GradingScale, on_delete=models.SET_NULL, null=True, blank=True)
    final_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    letter_grade = models.CharField(max_length=5, blank=True, null=True)
    date = models.DateField(auto_now_add=True)  # Date when the grade was entered

    class Meta:
        unique_together = ('student', 'course')  # Prevents duplicate grades for the same student in the same course

    def __str__(self):
        return f"{self.student} - {self.course} - {self.final_grade} ({self.letter_grade})"

    def calculate_final_grade(self):
        course = self.course
        student = self.student

        # Calculate the total weight of CA components
        ca_components_weight = GradeComponent.objects.filter(
            course=course, 
            component_type__in=[GradeComponent.ComponentType.QUIZ, GradeComponent.ComponentType.ASSIGNMENT, GradeComponent.ComponentType.MIDSEM]
        ).aggregate(total_weight=Sum('weight'))['total_weight'] or 0

        # Calculate the total weight of the exam component
        exam_component_weight = GradeComponent.objects.filter(
            course=course, 
            component_type=GradeComponent.ComponentType.EXAM
        ).aggregate(total_weight=Sum('weight'))['total_weight'] or 0

        # Check if the total weights are not equal to 100
        if ca_components_weight + exam_component_weight != 100:
            raise Exception(f"The total weights of CA components and Exam component for course '{course}' must add up to 100%. Currently CA: {ca_components_weight}%, Exam: {exam_component_weight}%.")
        
        # Calculate CA component
        ca_scores = Score.objects.filter(
            student=student,
            component__course=course,
            component__component_type__in=[GradeComponent.ComponentType.QUIZ, GradeComponent.ComponentType.ASSIGNMENT, GradeComponent.ComponentType.MIDSEM]
        ).annotate(
            weighted_score=ExpressionWrapper(F('score') * F('component__weight') / 100, output_field=DecimalField())
        )
        total_ca_score = ca_scores.aggregate(total_ca=Sum('weighted_score'))['total_ca'] or 0

        # Calculate Exam component
        exam_score_obj = Score.objects.filter(
            student=student,
            component__course=course,
            component__component_type=GradeComponent.ComponentType.EXAM
        ).first()
        exam_score = exam_score_obj.score if exam_score_obj else 0

        # Calculate final grade
        final_grade = (total_ca_score * ca_components_weight / 100) + (exam_score * exam_component_weight / 100)

        # Update or create the Grade instance
        grade, created = Grade.objects.update_or_create(
            student=student, 
            course=course,
            defaults={
                'final_grade': final_grade,
                'grading_scale': course.grading_scale  # Assuming the course has a grading_scale field
            }
        )

        return grade
    
    def save(self, *args, **kwargs):
        if self.final_grade is not None and self.grading_scale:
            for grade_value, letter in self.grading_scale.grades.items():
                if self.final_grade >= float(grade_value):
                    self.letter_grade = letter
                    break
        super().save(*args, **kwargs)