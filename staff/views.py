from rest_framework import generics

from users.permissions import IsAdminOrReadOnly
from .models import Staff
from .serializers import StaffSerializer, StaffBasicInfoSerializer

class StaffListCreateView(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAdminOrReadOnly]
    

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