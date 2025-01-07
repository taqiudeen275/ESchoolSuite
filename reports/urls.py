from django.urls import path
from . import views
urlpatterns = [
    path('student-performance/', views.StudentPerformanceReportView.as_view(), name='student-performance-report'),
    path('attendance/', views.AttendanceReportView.as_view(), name='attendance-report'),
    path('enrollment/', views.EnrollmentReportView.as_view(), name='enrollment-report'),
    path('financial/', views.FinancialReportView.as_view(), name='financial-report'),
    path('fees/', views.FeesReportView.as_view(), name='fees-report'),
    path('payments/', views.PaymentsReportView.as_view(), name='payments-report'),
    path('students/', views.StudentReportView.as_view(), name='students-report'),
    path('staff/', views.StaffReportView.as_view(), name='staff-report'),
    path('courses/', views.CourseReportView.as_view(), name='courses-report'),
    path('classes/', views.ClassReportView.as_view(), name='classes-report'),
    
     path('student-performance-report/', views.student_performance_report, name='student_performance_report'),
    path('attendance-report/', views.attendance_report, name='attendance_report'),
    path('enrollment-report/', views.enrollment_report, name='enrollment_report'),
    path('financial-report/', views.financial_report, name='financial_report'),
    path('fees-report/', views.fees_report, name='fees_report'),
    path('payments-report/', views.payments_report, name='payments_report'),
    path('student-report/', views.student_report, name='student_report'),
    path('staff-report/', views.staff_report, name='staff_report'),
    path('course-report/', views.course_report, name='course_report'),
    path('class-report/', views.class_report, name='class_report'),
    
     path('custom/', views.custom_report, name='custom_report'),
]