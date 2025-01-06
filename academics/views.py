from datetime import date
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from academics.permissions import IsStudentEnrolled
from users.models import User
from users.permissions import IsAdminOrReadOnly, IsAdmin, IsParent, IsStudent, IsTeacher
from .models import Attendance, Course, Class, Enrollment, Grade, GradeComponent, GradingScale, Score
from .serializers import AttendanceSerializer, CourseSerializer, ClassSerializer, EnrollmentSerializer, GradeComponentSerializer, GradeSerializer, GradingScaleSerializer, ScoreSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, F   
from rest_framework import serializers


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]

class CourseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]

class ClassListCreateView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAdminOrReadOnly]
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'academic_year', 'class_teacher', 'courses', 'start_time', 'end_time', 'room']
    search_fields = ['name', 'academic_year', 'class_teacher__first_name', 'class_teacher__last_name', 'courses__name', 'room']


class ClassRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsAdminOrReadOnly]
    

class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'course', 'class_enrolled']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']

    def perform_create(self, serializer):
        # Check for class capacity
        class_enrolled = serializer.validated_data.get('class_enrolled')

        if class_enrolled:
            enrolled_count = Enrollment.objects.filter(class_enrolled=class_enrolled).count()
            if enrolled_count >= class_enrolled.max_students:
                raise ValidationError({"detail": "This class is already full."})

        serializer.save()

class EnrollmentRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdmin|IsStudentEnrolled]
    

class StudentEnrollmentListCreateView(generics.ListCreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsStudent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'class_enrolled']
    search_fields = ['course__name', 'class_enrolled__name']

    def get_queryset(self):
        """
        This view should return a list of all the enrollments
        for the currently authenticated student.
        """
        user = self.request.user
        if user.role == User.Role.STUDENT:
            return Enrollment.objects.filter(student=user.student_profile)
        else:
            return Enrollment.objects.none()  # Empty queryset for non-students

    def perform_create(self, serializer):
        student = self.request.user.student_profile  # Get the student profile

        # Check for class capacity
        class_enrolled = serializer.validated_data.get('class_enrolled')
        if class_enrolled:
            enrolled_count = Enrollment.objects.filter(class_enrolled=class_enrolled).count()
            if enrolled_count >= class_enrolled.max_students:
                raise ValidationError({"detail": "This class is already full."})

        # Prevent duplicate enrollment
        course = serializer.validated_data.get('course')
        if Enrollment.objects.filter(student=student, course=course).exists():
            raise ValidationError({"detail": "You are already enrolled in this course."})

        serializer.save(student=student)

class StudentEnrollmentRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsStudentEnrolled]

class AvailableCoursesList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated] # Changed to IsAuthenticated

    def get_queryset(self):
        """
        Returns a list of courses with available slots in at least one class.
        """
        # Get all classes that have space available
        available_classes = Class.objects.annotate(
            enrolled_count=Count('enrollments')
        ).filter(enrolled_count__lt=F('max_students'))

        # Get all courses that have at least one class with space available
        available_courses = Course.objects.filter(classes__in=available_classes).distinct()

        return available_courses
    


class TeacherAttendanceCreateListView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsTeacher]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['class_session', 'date', 'status']
    search_fields = ['student__first_name', 'student__last_name']

    def get_queryset(self):
        teacher = self.request.user.staff_profile
        today = date.today()
        return Attendance.objects.filter(class_session__class_teacher=teacher, date=today)

    def perform_create(self, serializer):
        # Check if attendance has already been taken for this class on this date
        class_session = serializer.validated_data.get('class_session')
        date = serializer.validated_data.get('date')
        if Attendance.objects.filter(class_session=class_session, date=date).exists():
            raise ValidationError("Attendance has already been taken for this class on this date.")
        
        serializer.save()

class StudentAttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsStudent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['class_session', 'date', 'status']
    search_fields = ['class_session__name', 'date']

    def get_queryset(self):
        student = self.request.user.student_profile
        return Attendance.objects.filter(student=student)

class ParentAttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['class_session', 'date', 'status']
    search_fields = ['class_session__name', 'date']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        return Attendance.objects.filter(student__parent=parent)
    
    

class GradingScaleListCreateView(generics.ListCreateAPIView):
    queryset = GradingScale.objects.all()
    serializer_class = GradingScaleSerializer
    permission_classes = [IsAdminOrReadOnly]

class GradingScaleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GradingScale.objects.all()
    serializer_class = GradingScaleSerializer
    permission_classes = [IsAdminOrReadOnly]

class GradeComponentListCreateView(generics.ListCreateAPIView):
    queryset = GradeComponent.objects.all()
    serializer_class = GradeComponentSerializer
    permission_classes = [IsTeacher]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'component_type']
    search_fields = ['name', 'course__name']

    def perform_create(self, serializer):
        teacher = self.request.user.staff_profile
        course = serializer.validated_data.get('course')

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        serializer.save()

class GradeComponentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GradeComponent.objects.all()
    serializer_class = GradeComponentSerializer
    permission_classes = [IsTeacher]

    def perform_update(self, serializer):
        teacher = self.request.user.staff_profile
        instance = self.get_object()

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=instance.course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        serializer.save()

    def perform_destroy(self, instance):
        teacher = self.request.user.staff_profile

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=instance.course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        instance.delete()

class ScoreListCreateView(generics.ListCreateAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [IsTeacher]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['component', 'student']
    search_fields = ['component__name', 'student__first_name', 'student__last_name']

    def perform_create(self, serializer):
        teacher = self.request.user.staff_profile
        component = serializer.validated_data.get('component')
        student = serializer.validated_data.get('student')

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=component.course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        # Check if a score already exists for this student and component
        existing_score = Score.objects.filter(student=student, component=component).first()
        if existing_score:
            raise serializers.ValidationError("A score already exists for this student in this component.")

        # Check if the score exceeds the maximum score for the component
        score_value = serializer.validated_data.get('score')
        if score_value > component.max_score:
            raise serializers.ValidationError(f"The score cannot exceed the maximum score ({component.max_score}) for this component.")

        serializer.save()

        # Recalculate the final grade after saving the score
        try:
            grade = Grade.objects.get(student=student, course=component.course)
            grade.calculate_final_grade()
            grade.save()
        except Grade.DoesNotExist:
            print("A grade does not exist for this student in this course.")

class ScoreRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [IsTeacher]

    def perform_update(self, serializer):
        teacher = self.request.user.staff_profile
        instance = self.get_object()

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=instance.component.course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        serializer.save()

        # Recalculate the final grade after updating the score
        try:
            grade = Grade.objects.get(student=instance.student, course=instance.component.course)
            grade.calculate_final_grade()
            grade.save()
        except Grade.DoesNotExist:
            print("A grade does not exist for this student in this course.")

    def perform_destroy(self, instance):
        teacher = self.request.user.staff_profile

        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=instance.component.course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        instance.delete()

        # Recalculate the final grade after deleting the score
        try:
            grade = Grade.objects.get(student=instance.student, course=instance.component.course)
            grade.calculate_final_grade()
            grade.save()
        except Grade.DoesNotExist:
            print("A grade does not exist for this student in this course.")

class TeacherGradeCreateListView(generics.ListCreateAPIView):
    serializer_class = GradeSerializer
    permission_classes = [IsTeacher]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'student']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']

    def get_queryset(self):
        teacher = self.request.user.staff_profile
        return Grade.objects.filter(course__classes__class_teacher=teacher)
    
    def perform_create(self, serializer):
        # Ensure the teacher is assigned to the course they are trying to enter a grade for
        teacher = self.request.user.staff_profile
        course = serializer.validated_data.get('course')
        
        # Check if the teacher is assigned to any class that teaches this course
        if not Class.objects.filter(courses=course, class_teacher=teacher).exists():
            raise serializers.ValidationError("You are not assigned to teach this course.")

        serializer.save()

class StudentGradeListView(generics.ListAPIView):
    serializer_class = GradeSerializer
    permission_classes = [IsStudent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course']
    search_fields = ['course__name']

    def get_queryset(self):
        student = self.request.user.student_profile
        return Grade.objects.filter(student=student)

class ParentGradeListView(generics.ListAPIView):
    serializer_class = GradeSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'student']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        return Grade.objects.filter(student__parent=parent)