from rest_framework import generics, status

from students.models import Student
from students.serializers import StudentSerializer
from .serializers import PasswordResetSerializer, PasswordResetConfirmSerializer
from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from users.permissions import IsAdmin, IsParent
from .models import Parent, User
from .serializers import ParentSerializer, ParentUserSerializer, UserCreateSerializer, UserSerializer, UserWithProfileSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from academics.models import Enrollment, Grade, Attendance, Assignment, Class
from academics.serializers import EnrollmentSerializer, GradeSerializer, AttendanceSerializer, AssignmentSerializer, ClassSerializer



class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.query_params.get('nested') == 'true':
            return UserWithProfileSerializer
        return UserSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check the user's role and delete the associated profile if applicable
        if instance.role == User.Role.STUDENT and hasattr(instance, 'student_profile'):
            instance.student_profile.delete()
        elif instance.role in [User.Role.TEACHER, User.Role.STAFF, User.Role.ACCOUNTANT, User.Role.LIBRARIAN, User.Role.COUNSELOR] and hasattr(instance, 'staff_profile'):
            instance.staff_profile.delete()

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CurrentUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.query_params.get('nested') == 'true':
            return UserWithProfileSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the user is trying to update their own profile
        if instance != request.user:
            return Response({"detail": "You can only update your own profile."}, status=status.HTTP_403_FORBIDDEN)

        # Prevent users from changing their own role
        if 'role' in request.data:
            return Response({"detail": "You cannot change your own role."}, status=status.HTTP_400_BAD_REQUEST)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class UserProfileRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithProfileSerializer
    permission_classes = [IsAdminUser]
    
    def get_serializer_class(self):
        if self.request.query_params.get('nested') == 'true':
            return UserWithProfileSerializer
        return UserSerializer

    def get_object(self):
        user_id = self.kwargs['pk']
        try:
            user = User.objects.get(pk=user_id)
            if user.role == User.Role.STUDENT:
                if not hasattr(user, 'student_profile'):
                    raise NotFound("Student profile not found for this user.")
            elif user.role in [User.Role.TEACHER, User.Role.STAFF, User.Role.ACCOUNTANT, User.Role.LIBRARIAN, User.Role.COUNSELOR]:
                if not hasattr(user, 'staff_profile'):
                    raise NotFound("Staff profile not found for this user.")
            return user
        except User.DoesNotExist:
            raise NotFound("User not found.")

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the user is trying to update their own profile
        if instance != request.user:
            return Response({"detail": "You can only update your own profile."}, status=status.HTTP_403_FORBIDDEN)

        # Prevent users from changing their own role
        if 'role' in request.data:
            return Response({"detail": "You cannot change your own role."}, status=status.HTTP_400_BAD_REQUEST)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
        
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['role', 'email', 'is_active']  # Fields to filter by
    search_fields = ['username', 'first_name', 'last_name', 'email']  # Fields to search in
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        if self.request.query_params.get('nested') == 'true':
            return UserWithProfileSerializer
        return UserSerializer        


class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        # Customize the response data
        response_data = {
            'access': str(serializer.validated_data['access']),
            'refresh': str(serializer.validated_data['refresh']),
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
        }

        return Response(response_data, status=status.HTTP_200_OK)

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


class ParentListCreateView(generics.ListCreateAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return ParentUserSerializer
        return ParentSerializer

class ParentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        if self.request.query_params.get('basic') == 'true':
            return ParentUserSerializer
        return ParentSerializer
    
    

@shared_task
def send_password_reset_email(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)

class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Generate token and UID
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Build the reset link
        reset_link = f"{request.build_absolute_uri('/')}api/users/password-reset/confirm/{uid}/{token}/"

        # Render the email template
        email_subject = 'Password Reset Request'
        email_body = render_to_string('users/password_reset_email.html', {
            'user': user,
            'reset_link': reset_link
        })

        # Send the email using Celery
        send_password_reset_email.delay(email_subject, email_body, settings.DEFAULT_FROM_EMAIL, [user.email])

        return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uid = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid user ID."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
    
    

class ParentChildrenListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        return Student.objects.filter(parent=parent)

class ParentChildDetailView(generics.RetrieveAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsParent]

    def get_queryset(self):
        parent = self.request.user.parent_profile
        return Student.objects.filter(parent=parent)

class ParentChildEnrollmentsListView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'class_enrolled']
    search_fields = ['course__name', 'class_enrolled__name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')  # Get student ID from URL
        return Enrollment.objects.filter(student__parent=parent, student_id=student_id)

class ParentChildGradesListView(generics.ListAPIView):
    serializer_class = GradeSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course']
    search_fields = ['course__name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')
        return Grade.objects.filter(student__parent=parent, student_id=student_id)

class ParentChildAttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['class_session', 'date', 'status']
    search_fields = ['class_session__name', 'date']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')
        return Attendance.objects.filter(student__parent=parent, student_id=student_id)

class ParentChildAssignmentsListView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course', 'due_date']
    search_fields = ['title', 'course__name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')
        return Assignment.objects.filter(course__classes__enrollments__student__parent=parent, course__classes__enrollments__student_id=student_id).distinct()

class ParentChildClassesListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsParent]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'academic_year', 'courses', 'start_time', 'end_time']
    search_fields = ['name', 'academic_year', 'courses__name']

    def get_queryset(self):
        parent = self.request.user.parent_profile
        student_id = self.kwargs.get('student_id')  # Get student ID from URL
        return Class.objects.filter(enrollments__student__parent=parent, enrollments__student_id=student_id).distinct()