from django.urls import path
from .views import PayrollListCreateView, PayrollRetrieveUpdateDestroyView, StaffListCreateView, StaffRetrieveUpdateDestroyView

urlpatterns = [
    path('', StaffListCreateView.as_view(), name='staff-list-create'),
    path('<int:pk>/', StaffRetrieveUpdateDestroyView.as_view(), name='staff-retrieve-update-destroy'),
    path('payroll/', PayrollListCreateView.as_view(), name='payroll-list-create'),
    path('payroll/<int:pk>/', PayrollRetrieveUpdateDestroyView.as_view(), name='payroll-retrieve-update-destroy'),
]