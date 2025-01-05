from django.urls import path
from .views import StaffListCreateView, StaffRetrieveUpdateDestroyView

urlpatterns = [
    path('', StaffListCreateView.as_view(), name='staff-list-create'),
    path('<int:pk>/', StaffRetrieveUpdateDestroyView.as_view(), name='staff-retrieve-update-destroy'),
]