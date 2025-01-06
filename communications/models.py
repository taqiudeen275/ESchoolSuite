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