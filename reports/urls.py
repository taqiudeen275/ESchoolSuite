from django.urls import path
from .views import StudentPerformanceReportView, AttendanceReportView, EnrollmentReportView, FinancialReportView, FeesReportView, PaymentsReportView, StudentReportView, StaffReportView, CourseReportView, ClassReportView

urlpatterns = [
    path('student-performance/', StudentPerformanceReportView.as_view(), name='student-performance-report'),
    path('attendance/', AttendanceReportView.as_view(), name='attendance-report'),
    path('enrollment/', EnrollmentReportView.as_view(), name='enrollment-report'),
    path('financial/', FinancialReportView.as_view(), name='financial-report'),
    path('fees/', FeesReportView.as_view(), name='fees-report'),
    path('payments/', PaymentsReportView.as_view(), name='payments-report'),
    path('students/', StudentReportView.as_view(), name='students-report'),
    path('staff/', StaffReportView.as_view(), name='staff-report'),
    path('courses/', CourseReportView.as_view(), name='courses-report'),
    path('classes/', ClassReportView.as_view(), name='classes-report'),
]