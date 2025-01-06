from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from users.permissions import IsAdmin, IsAdminOrReadOnly
from .models import Payroll, Staff
from .serializers import PayrollSerializer, StaffSerializer, StaffBasicInfoSerializer

class StaffListCreateView(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['gender', 'region', 'qualification', 'date_joined', 'user__role']
    search_fields = ['first_name', 'last_name', 'staff_id', 'email', 'phone_number']

    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return StaffBasicInfoSerializer
        return StaffSerializer

class StaffRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAdminOrReadOnly]
    

    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return StaffBasicInfoSerializer
        return StaffSerializer
    

class PayrollListCreateView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['staff', 'start_date', 'end_date', 'status']
    search_fields = ['staff__first_name', 'staff__last_name', 'notes']

class PayrollRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [IsAdmin]