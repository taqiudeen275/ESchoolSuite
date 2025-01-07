from django.shortcuts import render
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from students.models import Student
from staff.models import Staff
from academics.models import Attendance, Enrollment
from fees.models import Fee, Payment
from django.db.models import Sum, Count
from users.permissions import IsAdmin


@api_view(['GET'])
@permission_classes([IsAdmin])
def dashboard_data(request):
    total_students = Student.objects.all().count()
    total_staff = Staff.objects.all().count()
    total_enrollments = Enrollment.objects.all().count()
    total_fees = Fee.objects.all().aggregate(Sum('amount'))['amount__sum'] or 0
    total_payments = Payment.objects.all().aggregate(Sum('amount_paid'))['amount_paid__sum'] or 0
    # Calculate the total amount paid by parents
    total_paid_by_parents = Payment.objects.filter(status='Completed').aggregate(Sum('amount_paid'))['amount_paid__sum'] or 0
    # Calculate the total outstanding fees
    total_outstanding_fees = total_fees - total_paid_by_parents if total_fees is not None else 0
    attendance_rate = calculate_attendance_rate()  # You'll need to implement this function

    data = {
        'total_students': total_students,
        'total_staff': total_staff,
        'total_enrollments': total_enrollments,
        'total_fees': total_fees,
        'total_payments': total_payments,
        'total_outstanding_fees': total_outstanding_fees,
        'attendance_rate': attendance_rate,
    }
    return Response(data)

def calculate_attendance_rate():
    total_attendance_records = Attendance.objects.all().count()
    if total_attendance_records == 0:
        return 0  # Avoid division by zero
    present_count = Attendance.objects.filter(status='PRESENT').count()
    return (present_count / total_attendance_records) * 100



def admin_dashboard(request):
    # Fetch the data from the dashboard_data API endpoint
    response = requests.get('http://127.0.0.1:8000/api/dashboard/')  # Replace with your actual API endpoint URL
    
    if response.status_code == 200:
        dashboard_data = response.json()
    else:
        dashboard_data = {}

    return render(request, 'dashboard/dashboard.html', {'dashboard_data': dashboard_data})