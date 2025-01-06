from rest_framework import serializers
from .models import Fee, Payment

class FeeSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    class Meta:
        model = Fee
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    fee = serializers.StringRelatedField()
    class Meta:
        model = Payment
        fields = '__all__'