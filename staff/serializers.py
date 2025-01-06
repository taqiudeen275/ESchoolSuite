from rest_framework import serializers
from .models import Payroll, Staff
from users.serializers import StaffUserSerializer

class StaffSerializer(serializers.ModelSerializer):
    user = StaffUserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = ['user', 'staff_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'email', 'phone_number', 'qualification', 'experience', 'date_joined', 'social_security_number', 'bank_name', 'bank_account_number', 'bank_branch', 'salary']
        read_only_fields = ['staff_id']

class StaffBasicInfoSerializer(serializers.ModelSerializer):
    user = StaffUserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = ['id', 'user', 'staff_id', 'first_name', 'last_name', 'middle_name', 'email', 'phone_number', 'qualification', 'date_joined']
        
        

class PayrollSerializer(serializers.ModelSerializer):
    staff = serializers.StringRelatedField()
    class Meta:
        model = Payroll
        fields = '__all__'
        read_only_fields = ['net_pay']