from rest_framework import serializers
from .models import Message
from users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    student = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'student', 'subject', 'body', 'timestamp', 'is_read']
        read_only_fields = ['timestamp']