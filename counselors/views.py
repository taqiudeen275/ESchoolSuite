from rest_framework import generics, permissions
from students.models import Student
from .models import CounselingSession
from .serializers import CounselingSessionSerializer, StudentCounselorSerializer
from users.permissions import IsCounselor
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.response import Response
from rest_framework import status


class CounselorStudentListView(generics.ListAPIView):
    serializer_class = StudentCounselorSerializer
    permission_classes = [IsCounselor]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student_id', 'first_name', 'last_name', 'gender', 'region']
    search_fields = ['first_name', 'last_name', 'email', 'phone_number', 'address']

    def get_queryset(self):
        return Student.objects.all()



class CounselorStudentDetailView(generics.RetrieveAPIView):
    serializer_class = StudentCounselorSerializer
    permission_classes = [IsCounselor]

    def get_queryset(self):
        return Student.objects.all()
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        # Check if the logged-in user is a counselor
        if not self.request.user.is_authenticated or self.request.user.role != 'COUNSELOR':
            return Response(status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



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