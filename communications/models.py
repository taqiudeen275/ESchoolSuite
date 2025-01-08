from django.db import models
from django.conf import settings
from students.models import Student

User = settings.AUTH_USER_MODEL

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="messages", null=True, blank=True)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"From: {self.sender.get_full_name()}, To: {self.recipient.get_full_name()}, Subject: {self.subject}"
    
    

class BulkMessage(models.Model):
    class DeliveryMethod(models.TextChoices):
        EMAIL = 'email', 'Email'
        SMS = 'sms', 'SMS'

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bulk_messages")
    recipient_group = models.CharField(max_length=50)  # For now, a simple text field (e.g., "All Students", "Class 1A")
    subject = models.CharField(max_length=255)  # Subject for emails
    message_body = models.TextField()
    custom_recipients = models.TextField(blank=True, null=True, help_text="Enter recipient emails or phone numbers separated by commas or newlines.")
    delivery_method = models.CharField(max_length=20, choices=DeliveryMethod.choices, default=DeliveryMethod.EMAIL)
    status = models.CharField(max_length=20, choices=(('Pending', 'Pending'), ('Sent', 'Sent'), ('Failed', 'Failed')), default='Pending')
    scheduled_time = models.DateTimeField(null=True, blank=True)  # Optional: For scheduling messages
    sent_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"From: {self.sender.get_full_name()}, To: {self.recipient_group}, Subject: {self.subject}"