from rest_framework import generics, permissions, status
from .models import Book, BorrowingRecord
from .serializers import BookSerializer, BorrowingRecordSerializer
from users.permissions import IsLibrarian
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import serializers

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsLibrarian]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['title', 'author', 'genre']
    search_fields = ['title', 'author', 'isbn', 'publisher', 'genre']

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsLibrarian]

class BorrowingRecordListCreateView(generics.ListCreateAPIView):
    queryset = BorrowingRecord.objects.all()
    serializer_class = BorrowingRecordSerializer
    permission_classes = [IsLibrarian]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['book', 'student', 'staff', 'status']
    search_fields = ['book__title', 'student__user__first_name', 'student__user__last_name', 'staff__user__first_name', 'staff__user__last_name']

    def perform_create(self, serializer):
        book = serializer.validated_data.get('book')
        if book.copies_available <= 0:
            raise serializers.ValidationError("No copies of this book are currently available.")
        serializer.save()

class BorrowingRecordRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BorrowingRecord.objects.all()
    serializer_class = BorrowingRecordSerializer
    permission_classes = [IsLibrarian]

    def perform_update(self, serializer):
        instance = self.get_object()

        # Check if the book is being returned
        if serializer.validated_data.get('return_date') and not instance.return_date:
            instance.return_date = timezone.now().date()
            instance.status = 'Returned'
            instance.book.copies_available += 1
            instance.book.save()

        serializer.save()

class OverdueBookListView(generics.ListAPIView):
    serializer_class = BorrowingRecordSerializer
    permission_classes = [IsLibrarian]

    def get_queryset(self):
        today = timezone.now().date()
        return BorrowingRecord.objects.filter(due_date__lt=today, return_date__isnull=True, status='Borrowed')