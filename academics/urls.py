from django.urls import path
from .views import CourseListCreateView, CourseRetrieveUpdateDestroyView, ClassListCreateView, ClassRetrieveUpdateDestroyView

urlpatterns = [
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyView.as_view(), name='course-retrieve-update-destroy'),
    path('classes/', ClassListCreateView.as_view(), name='class-list-create'),
    path('classes/<int:pk>/', ClassRetrieveUpdateDestroyView.as_view(), name='class-retrieve-update-destroy'),
]