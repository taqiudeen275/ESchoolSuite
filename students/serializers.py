from rest_framework import serializers
from .models import Student
from users.serializers import StudentUserSerializer

class StudentSerializer(serializers.ModelSerializer):
    user = StudentUserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['student_id', 'admission_number', 'admission_date']

class StudentBasicInfoSerializer(serializers.ModelSerializer):
    user = StudentUserSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ['id', 'user', 'student_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'email']