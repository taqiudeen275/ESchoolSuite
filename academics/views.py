from rest_framework import generics
from rest_framework.exceptions import ValidationError
from academics.permissions import IsStudentEnrolled
from users.models import User
from users.permissions import IsAdminOrReadOnly, IsAdmin, IsStudent
from .models import Course, Class, Enrollment
from .serializers import CourseSerializer, ClassSerializer, EnrollmentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, F   

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