from rest_framework import serializers
from .models import BulkMessage, Message
from users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    student = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'student', 'subject', 'body', 'timestamp', 'is_read']
        read_only_fields = ['timestamp']
        



class BulkMessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()

    class Meta:
        model = BulkMessage
        fields = [
            'id',
            'sender',
            'recipient_group',
            'subject',
            'message_body',
            'delivery_method',
            'status',
            'scheduled_time',
            'sent_time',
        ]
        read_only_fields = ['status', 'sent_time']