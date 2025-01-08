from datetime import timezone
import requests
from rest_framework import generics, permissions
from django.conf import settings
from ESchoolSuite.tasks import send_bulk_email_task, send_bulk_sms_task
from academics.models import Class
from staff.models import Staff
from students.models import Student
from .models import BulkMessage, Message
from .serializers import BulkMessageSerializer, MessageSerializer
from users.models import Parent, User
from users.permissions import IsAdmin, IsParent, IsTeacher
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import serializers
from django.core.mail import send_mail
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
        



class BulkMessageListCreateView(generics.ListCreateAPIView):
    queryset = BulkMessage.objects.all()
    serializer_class = BulkMessageSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['recipient_group', 'status', 'delivery_method']
    search_fields = ['subject', 'message_body']

    def perform_create(self, serializer):
        bulk_message = serializer.save(sender=self.request.user)
        if bulk_message.delivery_method == BulkMessage.DeliveryMethod.EMAIL:
            recipient_list = self.get_recipients(bulk_message.recipient_group, bulk_message.custom_recipients)
            if recipient_list:
                send_bulk_email_task.delay(
                    bulk_message.subject,
                    bulk_message.message_body,
                    settings.DEFAULT_FROM_EMAIL,
                    recipient_list,
                )
            else:
                bulk_message.status = 'Failed'
                bulk_message.save()
        elif bulk_message.delivery_method == BulkMessage.DeliveryMethod.SMS:
            recipients = self.get_recipients(bulk_message.recipient_group, bulk_message.custom_recipients, as_phone_numbers=True)
            if recipients:
                send_bulk_sms_task.delay(
                    settings.ARKESEL_API_KEY,
                    settings.ARKESEL_SENDER_ID,
                    bulk_message.message_body,
                    recipients,
                )
            else:
                bulk_message.status = 'Failed'
                bulk_message.save()

    def get_recipients(self, recipient_group, custom_recipients=None, as_phone_numbers=False):
        recipients = []

        if recipient_group:
            # Existing logic to get recipients based on group
            if recipient_group == 'All Students':
                if as_phone_numbers:
                    recipients.extend([student.phone_number for student in Student.objects.all() if student.phone_number])
                else:
                    recipients.extend([student.user.email for student in Student.objects.all() if student.user.email])
            elif recipient_group == 'All Parents':
                if as_phone_numbers:
                    recipients.extend([parent.phone_number for parent in Parent.objects.all() if parent.phone_number])
                else:
                    recipients.extend([parent.user.email for parent in Parent.objects.all() if parent.user.email])
            elif recipient_group == 'All Teachers':
                if as_phone_numbers:
                    recipients.extend([staff.phone_number for staff in Staff.objects.filter(user__role=User.Role.TEACHER) if staff.phone_number])
                else:
                    recipients.extend([staff.user.email for staff in Staff.objects.filter(user__role=User.Role.TEACHER) if staff.user.email])
            elif recipient_group == 'All Staff':
                if as_phone_numbers:
                    recipients.extend([staff.phone_number for staff in Staff.objects.all() if staff.phone_number])
                else:
                    recipients.extend([staff.user.email for staff in Staff.objects.all() if staff.user.email])
            else:
                # Handle filtering by class
                try:
                    class_obj = Class.objects.get(name=recipient_group)
                    students_in_class = Student.objects.filter(enrollments__class_enrolled=class_obj).distinct()

                    if as_phone_numbers:
                        recipients.extend([student.phone_number for student in students_in_class if student.phone_number])
                    else:
                        recipients.extend([student.user.email for student in students_in_class if student.user.email])

                except Class.DoesNotExist:
                    return []

        if custom_recipients:
            # Handle custom recipients
            custom_recipients_list = custom_recipients.replace('\n', ',').split(',')
            for recipient in custom_recipients_list:
                recipient = recipient.strip()
                if recipient:  # Add only if not empty
                    if as_phone_numbers and recipient.startswith("+"):  # Basic check for phone numbers
                        recipients.append(recipient)
                    elif '@' in recipient:  # Basic check for email
                        recipients.append(recipient)

        return list(set(recipients))  # Remove duplicates

class BulkMessageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BulkMessage.objects.all()
    serializer_class = BulkMessageSerializer
    permission_classes = [IsAdmin]