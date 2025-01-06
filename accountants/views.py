from rest_framework import generics, permissions
from fees.models import Fee, Payment
from fees.serializers import FeeSerializer, PaymentSerializer
from users.permissions import IsAccountant
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class AccountantFeeListView(generics.ListAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [IsAccountant]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'name', 'due_date']
    search_fields = ['name', 'description', 'student__first_name', 'student__last_name']

class AccountantFeeDetailView(generics.RetrieveAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [IsAccountant]

class AccountantPaymentListView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAccountant]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['fee', 'status', 'payment_method']
    search_fields = ['transaction_id', 'fee__name', 'fee__student__first_name', 'fee__student__last_name']

class AccountantPaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAccountant]