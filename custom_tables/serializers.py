from rest_framework import serializers
from .models import CustomTable, CustomField

class CustomFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomField
        fields = '__all__'

class CustomTableSerializer(serializers.ModelSerializer):
    fields = CustomFieldSerializer(many=True, read_only=True)

    class Meta:
        model = CustomTable
        fields = '__all__'