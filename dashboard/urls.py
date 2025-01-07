from django.urls import path
from .views import admin_dashboard, dashboard_data

urlpatterns = [
    path('', dashboard_data, name='dashboard-data'),
     path('view/', admin_dashboard, name='admin-dashboard'),
]