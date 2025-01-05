from rest_framework import serializers

from users.models import User
from .models import Course, Class
from users.serializers import UserSerializer

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class ClassTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class ClassSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    class_teacher = ClassTeacherSerializer(read_only=True)

    class Meta:
        model = Class
        fields = '__all__'