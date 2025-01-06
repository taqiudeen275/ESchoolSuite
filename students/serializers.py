from rest_framework import serializers
from .models import AdmissionApplication, Student
from users.serializers import ParentSerializer, StudentUserSerializer

class StudentSerializer(serializers.ModelSerializer):
    user = StudentUserSerializer(read_only=True)
    parent = ParentSerializer(read_only=True)
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['student_id', 'admission_number', 'admission_date']

class StudentBasicInfoSerializer(serializers.ModelSerializer):
    user = StudentUserSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ['id', 'user', 'student_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'email']
        
        

class AdmissionApplicationSerializer(serializers.ModelSerializer):
    birth_certificate = serializers.FileField(required=False)
    transcript = serializers.FileField(required=False)
    passport_photo = serializers.FileField(required=False)

    class Meta:
        model = AdmissionApplication
        fields = '__all__'
        read_only_fields = ['application_date', 'status']

    def validate(self, data):
        """
        Perform cross-field validations.
        """
        if self.instance:  # Check if this is an update
            # Prevent updating application details after submission (except for status and notes)
            if any(field in data for field in ['first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'email', 'phone_number', 'address', 'city', 'region', 'nationality', 'guardian_name', 'guardian_phone_number', 'guardian_email', 'guardian_relationship', 'previous_school', 'program_of_study', 'birth_certificate', 'transcript', 'passport_photo']):
                if self.instance.status != AdmissionApplication.Status.PENDING:
                    raise serializers.ValidationError("Application details cannot be modified after submission.")
        return data