from rest_framework import serializers

from users.models import User
from .models import Attendance, Course, Class, Enrollment, Grade, GradeComponent, GradingScale, Score
from users.serializers import UserSerializer


class GradingScaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradingScale
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    grading_scale = GradingScaleSerializer()
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
        
        

class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    class_enrolled = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all())
    enrollment_date = serializers.DateField(read_only=True)
    class Meta:
        model = Enrollment
        fields = '__all__'
        

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
        read_only_fields = ['student', 'class_session', 'date']
        
        


class GradeComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeComponent
        fields = '__all__'

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    grading_scale = serializers.PrimaryKeyRelatedField(queryset=GradingScale.objects.all())

    class Meta:
        model = Grade
        fields = '__all__'
        read_only_fields = ['final_grade', 'letter_grade']

    def validate(self, data):
        grade = data.get('grade')
        grading_scale = data.get('grading_scale')

        # Check if the grade is valid for the selected grading scale
        if grading_scale and grade:
            if grade not in grading_scale.grades:
                raise serializers.ValidationError(f"Invalid grade '{grade}' for grading scale '{grading_scale.name}'.")

        return data

    def create(self, validated_data):
        # Get the course and student from the validated data
        course = validated_data['course']
        student = validated_data['student']

        # Check if a grade already exists for this student and course
        existing_grade = Grade.objects.filter(student=student, course=course).first()
        if existing_grade:
            raise serializers.ValidationError("A grade already exists for this student in this course.")

        # Set the grading_scale based on the course level
        if course.level == GradingScale.Level.JHS:
            validated_data['grading_scale'] = GradingScale.objects.filter(level=GradingScale.Level.JHS, is_active=True).first()
        elif course.level == GradingScale.Level.SHS:
            validated_data['grading_scale'] = GradingScale.objects.filter(level=GradingScale.Level.SHS, is_active=True).first()
        # Add more conditions as needed for other levels

        # Create the grade
        grade = Grade.objects.create(**validated_data)

        return grade
