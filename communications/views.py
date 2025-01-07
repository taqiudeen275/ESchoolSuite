from datetime import timezone
import requests
from rest_framework import generics, permissions
from django.conf import settings
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
            self.send_email(bulk_message)
        elif bulk_message.delivery_method == BulkMessage.DeliveryMethod.SMS:
            self.send_sms(bulk_message)

    def send_email(self, bulk_message):
        # Implement email sending logic here (using Django's send_mail or a third-party library)
        recipient_list = self.get_recipients(bulk_message.recipient_group)  # You'll need to define this method
        if recipient_list:
            try:
                send_mail(
                    subject=bulk_message.subject,
                    message=bulk_message.message_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=recipient_list,
                    fail_silently=False,
                )
                bulk_message.status = 'Sent'
                bulk_message.sent_time = timezone.now()
            except Exception as e:
                bulk_message.status = 'Failed'
            finally:
                bulk_message.save()
        else:
            bulk_message.status = 'Failed'
            bulk_message.save()

    def send_sms(self, bulk_message):
        # Implement Arkesel SMS sending logic here
        api_key = settings.ARKESEL_API_KEY  # Store your API key in settings.py
        sender = settings.ARKESEL_SENDER_ID  # Store your sender ID in settings.py
        recipients = self.get_recipients(bulk_message.recipient_group, as_phone_numbers=True)

        if not recipients:
            bulk_message.status = 'Failed'
            bulk_message.save()
            return

        # Arkesel SMS API endpoint
        url = "https://sms.arkesel.com/v2/sms/send"

        headers = {
            'api-key': api_key
        }

        payload = {
            'sender': sender,
            'message': bulk_message.message_body,
            'recipients': recipients
        }

        try:
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()  # Raise an exception for bad status codes

            # Check for successful response from Arkesel
            if response.json()['status'] == 'success':
                bulk_message.status = 'Sent'
                bulk_message.sent_time = timezone.now()
            else:
                bulk_message.status = 'Failed'
        except requests.exceptions.RequestException as e:
            bulk_message.status = 'Failed'
        except (KeyError, ValueError):
            bulk_message.status = 'Failed'
        finally:
            bulk_message.save()

    def get_recipients(self, recipient_group, as_phone_numbers=False):
        # Implement logic to get recipient emails or phone numbers based on recipient_group
        # This is a placeholder, you'll need to customize it based on your application logic
        if recipient_group == 'All Students':
            if as_phone_numbers:
                return [student.phone_number for student in Student.objects.all() if student.phone_number]
            else:
                return [student.user.email for student in Student.objects.all() if student.user.email]
        elif recipient_group == 'All Parents':
            if as_phone_numbers:
                return [parent.phone_number for parent in Parent.objects.all() if parent.phone_number]
            else:
                return [parent.user.email for parent in Parent.objects.all() if parent.user.email]
        # Add more conditions for other recipient groups
        return []

class BulkMessageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BulkMessage.objects.all()
    serializer_class = BulkMessageSerializer
    permission_classes = [IsAdmin]