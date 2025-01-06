from rest_framework import serializers
from students.models import Student
from .models import CounselingSession
from users.serializers import UserSerializer

class StudentCounselorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ['id', 'user']

class CounselingSessionSerializer(serializers.ModelSerializer):
    counselor = serializers.StringRelatedField()
    student = StudentCounselorSerializer()
    class Meta:
        model = CounselingSession
        fields = '__all__'
        read_only_fields = ['counselor']