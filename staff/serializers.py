from rest_framework import serializers
from .models import Payroll, Staff
from users.serializers import StaffUserSerializer

class StaffSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Staff
        fields = '__all__'
        read_only_fields = ['staff_id', 'user']

    def create(self, validated_data):
        # Create the Staff instance
        staff = Staff.objects.create(**validated_data)

        return staff

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