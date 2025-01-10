from django.urls import include, path

from fees.views import ParentPaymentHistoryView, ParentUnpaidFeesView
from .views import (CurrentUserProfileView, ParentListCreateView, 
                    ParentRetrieveUpdateDestroyView, PasswordResetConfirmView, 
                    PasswordResetView, UserListCreateView, UserRetrieveUpdateDestroyView,
                    UserProfileRetrieveView,UserProfileRetrieveView,
                    MyTokenObtainPairView, UserRegistrationView, 
                    UserLogoutView,  ParentChildrenListView,
                    ParentChildDetailView, ParentChildEnrollmentsListView,
                    ParentChildGradesListView, ParentChildAttendanceListView,
                    ParentChildAssignmentsListView, ParentChildClassesListView,)

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('<int:pk>/profile/', UserProfileRetrieveView.as_view(), name='user-profile-retrieve'),
    path('me/', CurrentUserProfileView.as_view(), name='current-user-profile'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('parents/', ParentListCreateView.as_view(), name='parent-list-create'),
    path('parents/<int:pk>/', ParentRetrieveUpdateDestroyView.as_view(), name='parent-retrieve-update-destroy'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset/confirm/<str:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path("parent/children/", ParentChildrenListView.as_view(), name="parent-children-list"),
    path("parent/children/<int:pk>/", ParentChildDetailView.as_view(), name="parent-child-detail"),
    path("parent/children/<int:student_id>/enrollments/", ParentChildEnrollmentsListView.as_view(), name="parent-child-enrollments"),
    path("parent/children/<int:student_id>/grades/", ParentChildGradesListView.as_view(), name="parent-child-grades"),
    path("parent/children/<int:student_id>/attendance/", ParentChildAttendanceListView.as_view(), name="parent-child-attendance"),
    path("parent/children/<int:student_id>/assignments/", ParentChildAssignmentsListView.as_view(), name="parent-child-assignments"),
    path("parent/children/<int:student_id>/classes/", ParentChildClassesListView.as_view(), name="parent-child-classes"),
     path("parent/children/<int:student_id>/unpaid-fees/", ParentUnpaidFeesView.as_view(), name="parent-unpaid-fees"),
    path('parent/payments/', ParentPaymentHistoryView.as_view(), name='parent-payment-history'),
     path("parent/children/<int:student_id>/fees/", include('fees.urls')),

]