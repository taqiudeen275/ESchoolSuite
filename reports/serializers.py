from rest_framework import serializers
from students.models import Student
from academics.models import Grade, Attendance, Enrollment, Course, Class
from staff.models import Staff
from fees.models import Fee, Payment

class StudentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'student_id']  # Include necessary fields

class GradeReportSerializer(serializers.ModelSerializer):
    student = StudentReportSerializer()
    course = serializers.StringRelatedField()

    class Meta:
        model = Grade
        fields = ['student', 'course', 'final_grade', 'letter_grade']

class AttendanceReportSerializer(serializers.ModelSerializer):
    student = StudentReportSerializer()
    class_session = serializers.StringRelatedField()
    class Meta:
        model = Attendance
        fields = ['student', 'class_session', 'date', 'status']

class EnrollmentReportSerializer(serializers.ModelSerializer):
    student = StudentReportSerializer()
    course = serializers.StringRelatedField()
    class_enrolled = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['student', 'course', 'class_enrolled', 'enrollment_date']

class CourseReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'level']

class ClassReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'academic_year', 'start_time', 'end_time', 'room']

class FeeReportSerializer(serializers.ModelSerializer):
    student = StudentReportSerializer()
    class Meta:
        model = Fee
        fields = ['student', 'name', 'description', 'amount', 'due_date']

class PaymentReportSerializer(serializers.ModelSerializer):
    fee = FeeReportSerializer()
    class Meta:
        model = Payment
        fields = ['fee', 'amount_paid', 'payment_date', 'transaction_id', 'status']

class StaffReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'first_name', 'last_name', 'staff_id']