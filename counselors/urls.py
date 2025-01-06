from django.urls import path
from .views import (
    CounselorStudentListView,
    CounselorStudentDetailView,
    CounselingSessionListCreateView,
    CounselingSessionRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('students/', CounselorStudentListView.as_view(), name='counselor-student-list'),
    path('students/<int:pk>/', CounselorStudentDetailView.as_view(), name='counselor-student-detail'),
    path('sessions/', CounselingSessionListCreateView.as_view(), name='counseling-session-list-create'),
    path('sessions/<int:pk>/', CounselingSessionRetrieveUpdateDestroyView.as_view(), name='counseling-session-retrieve-update-destroy'),
]