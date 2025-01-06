# yourapp/management/commands/populate_grading_data.py

from datetime import time
import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from academics.models import GradingScale, Course, GradeComponent, Grade, Class, Enrollment, Score
from users.models import User
from students.models import Student

class Command(BaseCommand):
    help = 'Populates the database with sample grading data'

    def handle(self, *args, **options):
        self.create_grading_scales()
        self.create_courses()
        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample grading data'))

    def create_grading_scales(self):
        # ... (GradingScale creation logic - already provided in previous responses) ...
        # Create BECE grading scale
        GradingScale.objects.create(
            name="BECE",
            level=GradingScale.Level.JHS,
            grades={
                "1": "Excellent",
                "2": "Very Good",
                "3": "Good",
                "4": "Credit",
                "5": "Credit",
                "6": "Credit",
                "7": "Pass",
                "8": "Pass",
                "9": "Fail"
            },
            is_active=True
        )

        # Create WASSCE grading scale
        GradingScale.objects.create(
            name="WASSCE",
            level=GradingScale.Level.SHS,
            grades={
                "A1": "Excellent",
                "B2": "Very Good",
                "B3": "Good",
                "C4": "Credit",
                "C5": "Credit",
                "C6": "Credit",
                "D7": "Pass",
                "E8": "Pass",
                "F9": "Fail"
            },
            is_active=True
        )

        # Create University of Ghana - 4.0 Scale grading scale
        GradingScale.objects.create(
            name="University of Ghana - 4.0 Scale",
            level=GradingScale.Level.UNIVERSITY,
            grades={
                "4.0": "A",
                "3.7": "A-",
                "3.3": "B+",
                "3.0": "B",
                "2.7": "B-",
                "2.3": "C+",
                "2.0": "C",
                "1.7": "C-",
                "1.3": "D+",
                "1.0": "D",
                "0.0": "F"
            },
            is_active=True
        )

        # Create University of Cape Coast - 4.0 Scale grading scale
        GradingScale.objects.create(
            name="University of Cape Coast - 4.0 Scale",
            level=GradingScale.Level.UNIVERSITY,
            grades={
                "4.0": "A",
                "3.5": "B+",
                "3.0": "B",
                "2.5": "C+",
                "2.0": "C",
                "1.5": "D+",
                "1.0": "D",
                "0.0": "F"
            },
            is_active=True
        )

        # Create KNUST - CWA System grading scale
        GradingScale.objects.create(
            name="KNUST - CWA System",
            level=GradingScale.Level.UNIVERSITY,
            grades={
                "70-100": "A",
                "60-69": "B",
                "50-59": "C",
                "40-49": "D",
                "0-39": "F"
            },
            is_active=True
        )

        # Create Sample Primary School Grading grading scale
        GradingScale.objects.create(
            name="Primary School Grading",
            level=GradingScale.Level.PRIMARY,
            grades={
                "A": "Excellent (80-100)",
                "B": "Very Good (70-79)",
                "C": "Good (60-69)",
                "D": "Pass (50-59)",
                "E": "Fair (40-49)",
                "F": "Fail (Below 40)"
            },
            is_active=True
        )

    def create_courses(self):
        # Get grading scales
        bece_scale = GradingScale.objects.get(name="BECE")
        wassce_scale = GradingScale.objects.get(name="WASSCE")
        ug_scale = GradingScale.objects.get(name="University of Ghana - 4.0 Scale")
        ucc_scale = GradingScale.objects.get(name="University of Cape Coast - 4.0 Scale")
        knust_scale = GradingScale.objects.get(name="KNUST - CWA System")
        primary_scale = GradingScale.objects.get(name="Primary School Grading")

        # Sample courses for Primary level
        primary_courses = [
            {"name": "Mathematics", "code": "MATH", "level": "PRIMARY", "grading_scale": primary_scale},
            {"name": "English Language", "code": "ENG", "level": "PRIMARY", "grading_scale": primary_scale},
            {"name": "Integrated Science", "code": "SCI", "level": "PRIMARY", "grading_scale": primary_scale},
            {"name": "Social Studies", "code": "SST", "level": "PRIMARY", "grading_scale": primary_scale},
        ]

        # Sample courses for JHS level
        jhs_courses = [
            {"name": "Mathematics", "code": "MATH", "level": "JHS", "grading_scale": bece_scale},
            {"name": "English Language", "code": "ENG", "level": "JHS", "grading_scale": bece_scale},
            {"name": "Integrated Science", "code": "SCI", "level": "JHS", "grading_scale": bece_scale},
            {"name": "Social Studies", "code": "SST", "level": "JHS", "grading_scale": bece_scale},
        ]

        # Sample courses for SHS level
        shs_courses = [
            {"name": "Core Mathematics", "code": "CMATH", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Elective Mathematics", "code": "EMATH", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Core English", "code": "CENG", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Elective English", "code": "EENG", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Integrated Science", "code": "ISCI", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Social Studies", "code": "SOCS", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Physics", "code": "PHY", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Chemistry", "code": "CHEM", "level": "SHS", "grading_scale": wassce_scale},
            {"name": "Biology", "code": "BIO", "level": "SHS", "grading_scale": wassce_scale},
        ]

        # Sample courses for University level
        uni_courses = [
            {"name": "Introduction to Programming", "code": "COMP101", "level": "UNIVERSITY", "grading_scale": ug_scale, "credit_hours": 3},
            {"name": "Calculus I", "code": "MATH101", "level": "UNIVERSITY", "grading_scale": ug_scale, "credit_hours": 3},
            {"name": "Digital Electronics", "code": "EE201", "level": "UNIVERSITY", "grading_scale": knust_scale, "credit_hours": 3},
            {"name": "Thermodynamics", "code": "ME201", "level": "UNIVERSITY", "grading_scale": knust_scale, "credit_hours": 3},
            {"name": "Organic Chemistry", "code": "CHEM201", "level": "UNIVERSITY", "grading_scale": ucc_scale, "credit_hours": 3},
        ]
        
        # Function to create courses and components
        def create_courses_and_components(courses):
            for course_data in courses:
                course = Course.objects.create(
                    name=course_data["name"],
                    code=course_data["code"],
                    level=course_data["level"],
                    grading_scale=course_data["grading_scale"],
                    credit_hours=course_data.get("credit_hours", 0)  # credit_hours might not be present for all levels
                )

                # Create components for the course
                if course.level == "UNIVERSITY":
                    components_data = [
                        {"name": "Quiz 1", "component_type": "QUIZ", "max_score": 20, "weight": 5},
                        {"name": "Quiz 2", "component_type": "QUIZ", "max_score": 20, "weight": 5},
                        {"name": "Assignment 1", "component_type": "ASSIGNMENT", "max_score": 50, "weight": 10},
                        {"name": "Mid-Semester Exam", "component_type": "MIDSEM", "max_score": 50, "weight": 10},
                        {"name": "Final Exam", "component_type": "EXAM", "max_score": 100, "weight": 70},
                    ]
                else:
                    components_data = [
                        {"name": "Class Test 1", "component_type": "QUIZ", "max_score": 20, "weight": 10},
                        {"name": "Class Test 2", "component_type": "QUIZ", "max_score": 20, "weight": 10},
                        {"name": "Homework 1", "component_type": "ASSIGNMENT", "max_score": 50, "weight": 10},
                        {"name": "Mid-Semester Exam", "component_type": "MIDSEM", "max_score": 50, "weight": 10},
                        {"name": "Final Exam", "component_type": "EXAM", "max_score": 100, "weight": 60},
                    ]

                for component_data in components_data:
                    GradeComponent.objects.create(
                        course=course,
                        name=component_data["name"],
                        component_type=component_data["component_type"],
                        max_score=component_data["max_score"],
                        weight=component_data["weight"],
                        grading_scale=course.grading_scale
                    )

                # Create sample scores for some students and components
                students = Student.objects.all()[:5]  # Get the first 5 students
                for student in students:
                    for component in course.grade_components.all():
                        if component.component_type == GradeComponent.ComponentType.EXAM:
                            score_value = random.randint(50, int(component.max_score))  # Lower scores for exams
                        else:
                            score_value = random.randint(int(component.max_score * 0.6), int(component.max_score))
                        
                        Score.objects.create(
                            student=student,
                            component=component,
                            score=score_value,
                            date=timezone.now()
                        )
                
                # Calculate and save the final grade for each student in the course
                for student in students:
                    try:
                        grade = Grade.objects.get(student=student, course=course)
                        grade.calculate_final_grade()
                        grade.save()
                    except Grade.DoesNotExist:
                        print(f"No grade object found for student {student} in course {course}. Creating a new one.")
                        # Create a new grade object
                        grade = Grade(student=student, course=course)
                        grade.calculate_final_grade()
                        grade.save()

        # Create courses and components for each level
        create_courses_and_components(primary_courses)
        create_courses_and_components(jhs_courses)
        create_courses_and_components(shs_courses)
        create_courses_and_components(uni_courses)

        # Create classes for each course
        self.create_classes()
        self.enroll_students()

    def create_classes(self):
            # Get all teachers
            teachers = User.objects.filter(role=User.Role.TEACHER)
            teacher_count = teachers.count()

            if teacher_count == 0:
                print("No teachers found. Skipping class creation.")
                return

            # Iterate through each course and create classes
            for i, course in enumerate(Course.objects.all()):
                # Create 4 classes for each course
                for j in range(1, 5):
                    class_name = f"{course.name} Class {j}"
                    # Get a teacher based on index, cycling through teachers if necessary
                    teacher = teachers[i % teacher_count]

                    # Define start and end times for the class
                    start_time = time(hour=8 + j, minute=0)  # Example: Starts from 8:00 AM, incrementing by class number
                    end_time = time(hour=9 + j, minute=0)  # Example: Ends at 9:00 AM, incrementing by class number

                    # Create the class with the assigned teacher and times
                    class_obj = Class.objects.create(
                        name=class_name,
                        academic_year="2023/2024",
                        class_teacher=teacher,
                        max_students=30,
                        start_time=start_time,
                        end_time=end_time,
                        room=f"Room {i*4 + j}"  # Example room numbering
                    )

                    # Add the course to the class
                    class_obj.courses.add(course)
                    class_obj.save()

    def enroll_students(self):
        # Get all students
        students = Student.objects.all()

        # Iterate through each class and enroll students
        for class_obj in Class.objects.all():
            # Enroll up to the maximum number of students in the class
            for student in students[:class_obj.max_students]:
                # Enroll the student in the course related to the class
                for course in class_obj.courses.all():
                    Enrollment.objects.create(
                        student=student,
                        course=course,
                        class_enrolled=class_obj,
                        enrollment_date=timezone.now().date()
                    )