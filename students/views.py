from rest_framework import generics
from rest_framework import status
from users.permissions import IsAdminOrReadOnly
from .models import AdmissionApplication, Student
from .serializers import AdmissionApplicationSerializer, StudentSerializer, StudentBasicInfoSerializer
from rest_framework.response import Response
from ESchoolSuite.tasks import send_application_submitted_email

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
    

class AdmissionApplicationListCreateView(generics.ListCreateAPIView):
    queryset = AdmissionApplication.objects.all()
    serializer_class = AdmissionApplicationSerializer
    permission_classes = [IsAdminOrReadOnly]  # Admin can manage, others can apply

    def perform_create(self, serializer):
        instance = serializer.save()
        # Send email notification (placeholder - to be integrated with Celery)
        print(f"Sending email notification for application {instance.id}...")
        send_application_submitted_email.delay(instance.id)

class AdmissionApplicationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AdmissionApplication.objects.all()
    serializer_class = AdmissionApplicationSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Only allow updating status and notes fields
        if any(field in request.data for field in ['first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'email', 'phone_number', 'address', 'city', 'region', 'nationality', 'guardian_name', 'guardian_phone_number', 'guardian_email', 'guardian_relationship', 'previous_school', 'program_of_study', 'birth_certificate', 'transcript', 'passport_photo']):
            if instance.status != AdmissionApplication.Status.PENDING:
                return Response({"detail": "Application details cannot be modified after submission."}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)