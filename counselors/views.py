from rest_framework import generics, permissions
from students.models import Student
from .models import CounselingSession
from .serializers import CounselingSessionSerializer, StudentCounselorSerializer
from users.permissions import IsCounselor
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class CounselorStudentListView(generics.ListAPIView):
    serializer_class = StudentCounselorSerializer
    permission_classes = [IsCounselor]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

    def get_queryset(self):
        return Student.objects.all()

class CounselorStudentDetailView(generics.RetrieveAPIView):
    serializer_class = StudentCounselorSerializer
    permission_classes = [IsCounselor]

    def get_queryset(self):
        return Student.objects.all()

class CounselingSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = CounselingSessionSerializer
    permission_classes = [IsCounselor]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student', 'session_date']
    search_fields = ['student__first_name', 'student__last_name']

    def get_queryset(self):
        counselor = self.request.user.staff_profile
        return CounselingSession.objects.filter(counselor=counselor)

    def perform_create(self, serializer):
        serializer.save(counselor=self.request.user.staff_profile)

class CounselingSessionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CounselingSessionSerializer
    permission_classes = [IsCounselor]

    def get_queryset(self):
        counselor = self.request.user.staff_profile
        return CounselingSession.objects.filter(counselor=counselor)