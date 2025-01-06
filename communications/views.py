from rest_framework import generics, permissions

from students.models import Student
from .models import Message
from .serializers import MessageSerializer
from users.models import User
from users.permissions import IsParent, IsTeacher
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import serializers

from django.db import models

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['sender', 'recipient', 'is_read']
    search_fields = ['subject', 'body']

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.TEACHER:
            return Message.objects.filter(models.Q(sender=user) | models.Q(recipient=user, student__in=user.staff_profile.classes_taught.all().values_list('enrollments__student', flat=True)))
        elif user.role == User.Role.PARENT:
            return Message.objects.filter(models.Q(sender=user) | models.Q(recipient=user, student__in=user.parent_profile.children.all()))
        else:
            return Message.objects.none()

    def perform_create(self, serializer):
        recipient_id = self.request.data.get('recipient')
        student_id = self.request.data.get('student')
        try:
            recipient = User.objects.get(pk=recipient_id)
            student = Student.objects.get(pk=student_id) if student_id else None
        except User.DoesNotExist:
            raise serializers.ValidationError("Recipient user does not exist.")
        except Student.DoesNotExist:
            raise serializers.ValidationError("Student does not exist.")

        # Check if the current user is a teacher and the recipient is a parent of a student in their class
        user = self.request.user
        if user.role == User.Role.TEACHER:
            if not student or not recipient.parent_profile.children.filter(id=student.id).exists():
                raise serializers.ValidationError("You can only send messages to parents of students in your class.")
            serializer.save(sender=user, recipient=recipient, student=student)
        elif user.role == User.Role.PARENT:
            # Check if the recipient is a teacher
            if recipient.role != User.Role.TEACHER:
                raise serializers.ValidationError("Parents can only send messages to teachers.")
            # Check if the student belongs to the parent
            if not user.parent_profile.children.filter(id=student.id).exists():
                raise serializers.ValidationError("You can only send messages regarding your own children.")
            serializer.save(sender=user, recipient=recipient, student=student)
        else:
            raise serializers.ValidationError("You are not authorized to send messages.")

class MessageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.TEACHER:
            return Message.objects.filter(models.Q(sender=user) | models.Q(recipient=user, student__in=user.staff_profile.classes_taught.all().values_list('enrollments__student', flat=True)))
        elif user.role == User.Role.PARENT:
            return Message.objects.filter(models.Q(sender=user) | models.Q(recipient=user, student__in=user.parent_profile.children.all()))
        else:
            return Message.objects.none()

    def perform_update(self, serializer):
        instance = self.get_object()
        if self.request.user == instance.recipient:
            serializer.save(is_read=True)
        else:
            raise exceptions.PermissionDenied("You can only update messages where you are the recipient.")