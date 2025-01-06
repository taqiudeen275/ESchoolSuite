from django.urls import path
from .views import AvailableCoursesList, CourseListCreateView, CourseRetrieveUpdateDestroyView, ClassListCreateView, ClassRetrieveUpdateDestroyView, EnrollmentListCreateView, EnrollmentRetrieveDestroyView, StudentEnrollmentListCreateView, StudentEnrollmentRetrieveDestroyView

urlpatterns = [
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyView.as_view(), name='course-retrieve-update-destroy'),
    path('classes/', ClassListCreateView.as_view(), name='class-list-create'),
    path('classes/<int:pk>/', ClassRetrieveUpdateDestroyView.as_view(), name='class-retrieve-update-destroy'),
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollment-list-create'),
    path('enrollments/<int:pk>/', EnrollmentRetrieveDestroyView.as_view(), name='enrollment-retrieve-destroy'),
     path("student/enrollments/", StudentEnrollmentListCreateView.as_view(), name="student-enrollment-list-create"),
    path("student/enrollments/<int:pk>/", StudentEnrollmentRetrieveDestroyView.as_view(), name="student-enrollment-detail"),
    path("courses/available/", AvailableCoursesList.as_view(), name="available-courses-list"),
]