from django.urls import path
from .views import (
    FeeListCreateView,
    FeeRetrieveUpdateDestroyView,
    PaymentListCreateView,
    PaymentRetrieveUpdateDestroyView,
    ParentPaymentHistoryView,
    ParentUnpaidFeesView,
)

urlpatterns = [
    path('fees/', FeeListCreateView.as_view(), name='fee-list-create'),
    path('fees/<int:pk>/', FeeRetrieveUpdateDestroyView.as_view(), name='fee-retrieve-update-destroy'),
    path('payments/', PaymentListCreateView.as_view(), name='payment-list-create'),
    path('payments/<int:pk>/', PaymentRetrieveUpdateDestroyView.as_view(), name='payment-retrieve-update-destroy'),
    path('parent/payments/', ParentPaymentHistoryView.as_view(), name='parent-payment-history'),
    path('parent/students/<int:student_id>/unpaid-fees/', ParentUnpaidFeesView.as_view(), name='parent-unpaid-fees'),
]