from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from users.permissions import IsAdminOrReadOnly
from .models import Staff
from .serializers import StaffSerializer, StaffBasicInfoSerializer

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