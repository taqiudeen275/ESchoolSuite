from django.urls import path
from .views import StudentListCreateView, StudentRetrieveUpdateDestroyView

urlpatterns = [
    path('', StudentListCreateView.as_view(), name='student-list-create'),
    path('<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student-retrieve-update-destroy'),
]