from rest_framework import generics, permissions
from fees.models import Fee, Payment
from fees.serializers import FeeSerializer, PaymentSerializer
from users.permissions import IsAccountant
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.response import Response
from django.db.models import Sum


class AccountantFeeListView(generics.ListAPIView):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [IsAccountant]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'name', 'due_date']
    search_fields = ['name', 'description', 'student__first_name', 'student__last_name']
    
    def get_queryset(self):
        queryset = Fee.objects.all()

        # Add filtering by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            queryset = queryset.filter(due_date__range=[start_date, end_date])

        return queryset

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
    
    def get_queryset(self):
        queryset = Payment.objects.all()

        # Add filtering by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            queryset = queryset.filter(payment_date__range=[start_date, end_date])

        return queryset

class AccountantPaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAccountant]
    
    

class AccountantFinancialReportView(generics.ListAPIView):
    serializer_class = PaymentSerializer  # Use PaymentSerializer for basic reporting
    permission_classes = [IsAccountant]

    def get_queryset(self):
        # Filter payments within a specific date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if start_date and end_date:
            queryset = Payment.objects.filter(payment_date__range=[start_date, end_date])
        else:
            queryset = Payment.objects.all()

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Calculate total fees collected
        total_fees_collected = queryset.aggregate(total_collected=Sum('amount_paid'))['total_collected'] or 0

        # Calculate total outstanding fees (this is a simplified calculation)
        total_fees = Fee.objects.all().aggregate(Sum('amount'))['amount__sum'] or 0
        total_outstanding_fees = total_fees - total_fees_collected

        # You can add more aggregations or calculations as needed

        return Response({
            'total_fees_collected': total_fees_collected,
            'total_outstanding_fees': total_outstanding_fees,
            'payments': self.get_serializer(queryset, many=True).data,  # Include payment details if needed
        })