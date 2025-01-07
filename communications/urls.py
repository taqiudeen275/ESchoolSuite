from django.urls import path
from .views import BulkMessageListCreateView, BulkMessageRetrieveUpdateDestroyView, MessageListCreateView, MessageRetrieveUpdateDestroyView

urlpatterns = [
    path('messages/', MessageListCreateView.as_view(), name='message-list-create'),
    path('messages/<int:pk>/', MessageRetrieveUpdateDestroyView.as_view(), name='message-retrieve-update-destroy'),
     path('bulk-messages/', BulkMessageListCreateView.as_view(), name='bulk-message-list-create'),
    path('bulk-messages/<int:pk>/', BulkMessageRetrieveUpdateDestroyView.as_view(), name='bulk-message-retrieve-update-destroy'),
]