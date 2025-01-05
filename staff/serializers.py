from rest_framework import serializers
from .models import Staff
from users.serializers import StaffUserSerializer

class StaffSerializer(serializers.ModelSerializer):
    user = StaffUserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = '__all__'
        read_only_fields = ['staff_id']

class StaffBasicInfoSerializer(serializers.ModelSerializer):
    user = StaffUserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = ['id', 'user', 'staff_id', 'first_name', 'last_name', 'middle_name', 'email', 'phone_number', 'qualification', 'date_joined']