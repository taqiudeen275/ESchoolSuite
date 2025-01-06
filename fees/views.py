from rest_framework import generics, permissions, status

from students.models import Student
from .models import Fee, Payment
from .serializers import FeeSerializer, PaymentSerializer
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from users.permissions import IsAdmin, IsAccountant, IsParent
from django.shortcuts import get_object_or_404
from rest_framework.serializers import ValidationError

class FeeListCreateView(generics.ListCreateAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [IsAdmin | IsAccountant]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'name', 'due_date']
    search_fields = ['student__user__first_name', 'student__user__last_name', 'name', 'description','student__first_name', 'student__last_name']

class FeeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [IsAdmin | IsAccountant]

class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAdmin | IsAccountant]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fee', 'status', 'payment_method']
    search_fields = ['fee__student__user__first_name', 'fee__student__user__last_name', 'fee__name', 'transaction_id']

    def perform_create(self, serializer):
        # Get the related fee
        fee = serializer.validated_data.get('fee')

        # Check if the payment amount exceeds the fee amount
        if serializer.validated_data['amount_paid'] > fee.amount:
            raise ValidationError("Payment amount cannot exceed the fee amount.")

        # Update the payment status based on the payment amount
        if serializer.validated_data['amount_paid'] >= fee.amount:
            payment_status = 'Completed'
        else:
            payment_status = 'Pending'

        serializer.save(status=payment_status)

class PaymentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAdmin | IsAccountant]

class ParentPaymentHistoryView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fee', 'status', 'payment_method']
    search_fields = ['fee__name', 'transaction_id']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        return Payment.objects.filter(fee__student__parent=parent)

class ParentUnpaidFeesView(generics.ListAPIView):
    serializer_class = FeeSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'due_date']
    search_fields = ['name', 'description']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')
        student = get_object_or_404(Student, id=student_id, parent=parent)

        # Get all fees for the student
        fees = Fee.objects.filter(student=student)

        # Filter out fees that have been fully paid
        unpaid_fees = [fee for fee in fees if fee.amount > sum(payment.amount_paid for payment in fee.payments.all())]

        return unpaid_fees
    
