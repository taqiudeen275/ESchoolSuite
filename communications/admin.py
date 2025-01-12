from django.contrib import admin
from .models import Message,BulkMessage

admin.site.register(Message)
admin.site.register(BulkMessage)