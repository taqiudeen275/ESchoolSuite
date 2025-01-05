from rest_framework import serializers
from .models import User
from students.models import Student
from staff.models import Staff

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'profile_picture']

class UserStudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'email', 'phone_number', 'admission_number', 'admission_date', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship', 'medical_conditions', 'allergies', 'previous_school_name', 'previous_school_address', 'previous_school_contact', 'religion', 'denomination']

class UserStaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['staff_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'email', 'phone_number', 'qualification', 'experience', 'date_joined', 'social_security_number', 'bank_name', 'bank_account_number', 'bank_branch']

class UserWithProfileSerializer(serializers.ModelSerializer):
    student_profile = UserStudentProfileSerializer(read_only=True)
    staff_profile = UserStaffProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'profile_picture', 'student_profile', 'staff_profile']

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture']

class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture']