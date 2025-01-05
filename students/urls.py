from django.urls import path
from .views import AdmissionApplicationListCreateView, AdmissionApplicationRetrieveUpdateDestroyView, StudentListCreateView, StudentRetrieveUpdateDestroyView

urlpatterns = [
    path('', StudentListCreateView.as_view(), name='student-list-create'),
    path('<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student-retrieve-update-destroy'),
     path('applications/', AdmissionApplicationListCreateView.as_view(), name='admission-application-list-create'),
    path('applications/<int:pk>/', AdmissionApplicationRetrieveUpdateDestroyView.as_view(), name='admission-application-retrieve-update-destroy'),
]