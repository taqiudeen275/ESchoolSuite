from django.urls import path
from .views import AccountantFeeListView, AccountantFeeDetailView, AccountantFinancialReportView, AccountantPaymentListView, AccountantPaymentDetailView

urlpatterns = [
    path('fees/', AccountantFeeListView.as_view(), name='accountant-fee-list'),
    path('fees/<int:pk>/', AccountantFeeDetailView.as_view(), name='accountant-fee-detail'),
    path('payments/', AccountantPaymentListView.as_view(), name='accountant-payment-list'),
    path('payments/<int:pk>/', AccountantPaymentDetailView.as_view(), name='accountant-payment-detail'),
     path('financial-report/', AccountantFinancialReportView.as_view(), name='accountant-financial-report'),
]