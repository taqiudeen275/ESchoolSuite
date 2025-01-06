from rest_framework import serializers
from .models import Book, BorrowingRecord

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowingRecordSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()
    student = serializers.StringRelatedField()
    staff = serializers.StringRelatedField()

    class Meta:
        model = BorrowingRecord
        fields = '__all__'
        read_only_fields = ['borrow_date', 'status']