from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from students.models import Student
from academics.models import Grade, Attendance, Enrollment, Course, Class
from staff.models import Staff
from fees.models import Fee, Payment
from .serializers import GradeReportSerializer, AttendanceReportSerializer, EnrollmentReportSerializer, FeeReportSerializer, PaymentReportSerializer, StudentReportSerializer, StaffReportSerializer, CourseReportSerializer, ClassReportSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.decorators import api_view
from django.http import HttpResponse
import csv
from rest_framework.response import Response
from rest_framework import status


class StudentPerformanceReportView(generics.ListAPIView):
    serializer_class = GradeReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'course', 'letter_grade']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']

    def get_queryset(self):
        queryset = Grade.objects.all()
        return queryset

class AttendanceReportView(generics.ListAPIView):
    serializer_class = AttendanceReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'class_session', 'date', 'status']
    search_fields = ['student__first_name', 'student__last_name']

    def get_queryset(self):
        queryset = Attendance.objects.all()
        return queryset

class EnrollmentReportView(generics.ListAPIView):
    serializer_class = EnrollmentReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'course', 'class_enrolled']
    search_fields = ['student__first_name', 'student__last_name', 'course__name', 'class_enrolled__name']

    def get_queryset(self):
        queryset = Enrollment.objects.all()
        return queryset

class CourseReportView(generics.ListAPIView):
    serializer_class = CourseReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'code', 'level']
    search_fields = ['name', 'code', 'level']

    def get_queryset(self):
        return Course.objects.all()

class ClassReportView(generics.ListAPIView):
    serializer_class = ClassReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'academic_year', 'class_teacher', 'courses', 'start_time', 'end_time', 'room']
    search_fields = ['name', 'academic_year', 'class_teacher__first_name', 'class_teacher__last_name', 'courses__name', 'room']

    def get_queryset(self):
        return Class.objects.all()

class FinancialReportView(generics.ListAPIView):
    # queryset = Fee.objects.all()  # You can use either Fee or Payment as the queryset
    serializer_class = FeeReportSerializer  # You can create a separate serializer for financial reports if needed
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        # Customize this method to return the data you want for financial reports
        # For example, you can aggregate data from Fee and Payment models
        # and return a combined queryset or a custom data structure.
        # For now, let's return all fees:
        return Fee.objects.all()

class FeesReportView(generics.ListAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'name', 'due_date']
    search_fields = ['name', 'description', 'student__first_name', 'student__last_name']

class PaymentsReportView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fee', 'status', 'payment_method']
    search_fields = ['transaction_id', 'fee__name', 'fee__student__first_name', 'fee__student__last_name']

class StudentReportView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['gender', 'region', 'admission_number', 'parent__user__email', 'parent__phone_number', 'parent__first_name', 'parent__last_name', 'parent__middle_name', 'parent__occupation']
    search_fields = ['first_name', 'last_name', 'student_id', 'email', 'phone_number', 'admission_number']

class StaffReportView(generics.ListAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffReportSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['gender', 'region', 'qualification', 'date_joined', 'user__role']
    search_fields = ['first_name', 'last_name', 'staff_id', 'email', 'phone_number']
    
    

@api_view(['GET', 'POST'])
def custom_report(request):
    # Allowed fields for the report
    allowed_fields = {
        'students': ['first_name', 'last_name', 'email', 'phone_number', 'address', 'city', 'region', 'student_id'],
        'staff': ['first_name', 'last_name', 'email', 'phone_number', 'staff_id'],
        'courses': ['name', 'code', 'description', 'credit_hours'],
        'classes': ['name', 'academic_year', 'start_time', 'end_time', 'room'],
        'enrollments': ['enrollment_date'],
        'attendance': ['date', 'status', 'remark'],
        'grades': ['final_grade', 'letter_grade'],
        'fees': ['name', 'amount', 'due_date'],
        'payments': ['amount_paid', 'payment_date', 'status'],
    }

    # Mapping from model names to actual model classes and serializers
    model_mapping = {
        'students': (Student, StudentReportSerializer),
        'staff': (Staff, StaffReportSerializer),
        'courses': (Course, CourseReportSerializer),
        'classes': (Class, ClassReportSerializer),
        'enrollments': (Enrollment, EnrollmentReportSerializer),
        'attendance': (Attendance, AttendanceReportSerializer),
        'grades': (Grade, GradeReportSerializer),
        'fees': (Fee, FeeReportSerializer),
        'payments': (Payment, PaymentReportSerializer),
    }

    if request.method == 'GET':
        # Return the list of available models and fields
        return Response(allowed_fields)

    elif request.method == 'POST':
        selected_model = request.data.get('model')
        selected_fields = request.data.get('fields', [])
        filters = request.data.get('filters', {})

        if not selected_model or selected_model not in model_mapping:
            return Response({"error": "Invalid model selected."}, status=status.HTTP_400_BAD_REQUEST)

        model_class, serializer_class = model_mapping[selected_model]

        # Validate selected fields
        valid_fields = allowed_fields[selected_model]
        if not all(field in valid_fields for field in selected_fields):
            return Response({"error": "Invalid fields selected."}, status=status.HTTP_400_BAD_REQUEST)

        # Build queryset with filters
        queryset = model_class.objects.all()
        for field, value in filters.items():
            if field in valid_fields:
                queryset = queryset.filter(**{f"{field}__icontains": value})

        # Filter fields in the serializer
        class CustomSerializer(serializer_class):
            class Meta(serializer_class.Meta):
                fields = selected_fields if selected_fields else '__all__'

        # Serialize and return data
        serializer = CustomSerializer(queryset, many=True)

        # Generate CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{selected_model}_report.csv"'
        writer = csv.DictWriter(response, fieldnames=selected_fields)
        writer.writeheader()
        for row in serializer.data:
            writer.writerow(row)

        return response