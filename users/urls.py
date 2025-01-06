from django.urls import path
from .views import ParentListCreateView, ParentRetrieveUpdateDestroyView, PasswordResetConfirmView, PasswordResetView, UserListCreateView, UserRetrieveUpdateDestroyView, UserProfileRetrieveView,UserProfileRetrieveView, MyTokenObtainPairView, UserRegistrationView, UserLogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('<int:pk>/profile/', UserProfileRetrieveView.as_view(), name='user-profile-retrieve'),
     path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('parents/', ParentListCreateView.as_view(), name='parent-list-create'),
    path('parents/<int:pk>/', ParentRetrieveUpdateDestroyView.as_view(), name='parent-retrieve-update-destroy'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset/confirm/<str:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]