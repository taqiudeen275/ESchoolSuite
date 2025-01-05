from rest_framework import generics

from users.permissions import IsAdminOrReadOnly
from .models import Student
from .serializers import StudentSerializer, StudentBasicInfoSerializer
from rest_framework.response import Response

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return StudentBasicInfoSerializer
        return StudentSerializer

class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminOrReadOnly]
    

    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return StudentBasicInfoSerializer
        return StudentSerializer