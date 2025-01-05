from rest_framework import generics
from .models import Course, Class
from .serializers import CourseSerializer, ClassSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ClassListCreateView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ClassRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer