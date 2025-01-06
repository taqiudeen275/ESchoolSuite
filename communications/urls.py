from django.urls import path
from .views import MessageListCreateView, MessageRetrieveUpdateDestroyView

urlpatterns = [
    path('messages/', MessageListCreateView.as_view(), name='message-list-create'),
    path('messages/<int:pk>/', MessageRetrieveUpdateDestroyView.as_view(), name='message-retrieve-update-destroy'),
]