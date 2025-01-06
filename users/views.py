from rest_framework import generics, status

from users.permissions import IsAdmin
from .models import Parent, User
from .serializers import ParentSerializer, ParentUserSerializer, UserCreateSerializer, UserSerializer, UserWithProfileSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken



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

class UserProfileRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithProfileSerializer
    permission_classes = [IsAdminUser]

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
    
        
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAdmin]

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