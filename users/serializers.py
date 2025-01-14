from rest_framework import serializers
from .models import Parent, User
from students.models import Student
from staff.models import Staff
from django.db import transaction
from django.utils import timezone
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password



class ParentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Parent
        fields = '__all__'

class ParentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture']

class UserParentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = ['first_name', 'last_name', 'middle_name', 'occupation', 'email', 'phone_number', 'address', 'place_of_work']


class UserRegisterationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'role')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        # Remove password2 from the data as it's not needed for user creation
        validated_data.pop('password2')
        print(validated_data)
        print(validated_data)
        print("========================")
        # Create user instance but don't save to DB yet
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],# create_user handles password hashing
            role=validated_data['role']
        # create_user handles password hashing
        )
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'profile_picture']

class UserStudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'email', 'phone_number', 'admission_number', 'admission_date', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship', 'medical_conditions', 'allergies', 'previous_school_name', 'previous_school_address', 'previous_school_contact', 'religion', 'denomination']


class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserStaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['staff_id', 'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'email', 'phone_number', 'qualification', 'experience', 'date_joined', 'social_security_number', 'bank_name', 'bank_account_number', 'bank_branch', 'salary']


class UserWithProfileSerializer(serializers.ModelSerializer):
    student_profile = UserStudentProfileSerializer(read_only=True)
    staff_profile = UserStaffProfileSerializer(read_only=True)
    parent_profile = UserParentProfileSerializer(read_only=True)


    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'profile_picture', 'student_profile', 'staff_profile', 'parent_profile']

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture']



class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.Role.choices)

    # Fields for Student and Staff creation
    date_of_birth = serializers.DateField(required=False, write_only=True)
    gender = serializers.CharField(required=False, write_only=True)
    address = serializers.CharField(required=False, write_only=True)
    city = serializers.CharField(required=False, write_only=True)
    region = serializers.CharField(required=False, write_only=True)
    nationality = serializers.CharField(required=False, write_only=True, default='Ghanaian')
    phone_number = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'first_name', 'last_name', 'profile_picture', 'date_of_birth', 'gender', 'address', 'city', 'region', 'nationality', 'phone_number', 'is_active', 'is_staff', 'is_superuser']

    def create(self, validated_data):
        role = validated_data.remove('role')  # Remove role from validated_data
        date_of_birth = validated_data.pop('date_of_birth', None)
        gender = validated_data.pop('gender', None)
        address = validated_data.pop('address', None)
        city = validated_data.pop('city', None)
        region = validated_data.pop('region', None)
        nationality = validated_data.pop('nationality', 'Ghanaian')
        phone_number = validated_data.pop('phone_number', None)

        with transaction.atomic():
            user = User.objects.create_user(
                **validated_data,
                role=role
            )

            if role == User.Role.STUDENT:
                student_id = f"S{user.id:04d}"
                admission_number = f"ADM{user.id:04d}"
                admission_date = timezone.now().date()
                student = Student.objects.create(
                    user=user,
                    student_id=student_id,
                    first_name=validated_data.get('first_name'),
                    last_name=validated_data.get('last_name'),
                    email=validated_data.get('email'),
                    admission_number=admission_number,
                    date_of_birth=date_of_birth,
                    gender=gender,
                    address=address,
                    city=city,
                    region=region,
                    nationality=nationality,
                    phone_number=phone_number,
                    admission_date=admission_date
                )

            elif role in [User.Role.TEACHER, User.Role.STAFF, User.Role.ACCOUNTANT, User.Role.LIBRARIAN, User.Role.COUNSELOR]:
                staff_id = f"ST{user.id:04d}"
                staff = Staff.objects.create(
                    user=user,
                    staff_id=staff_id,
                    first_name=validated_data.get('first_name'),
                    last_name=validated_data.get('last_name'),
                    email=validated_data.get('email'),
                    date_of_birth=date_of_birth,
                    gender=gender,
                    address=address,
                    city=city,
                    region=region,
                    nationality=nationality,
                    phone_number=phone_number,
                )
                
            elif role == User.Role.PARENT:
                parent = Parent.objects.create(
                    user=user,
                    first_name=validated_data.get('first_name'),
                    last_name=validated_data.get('last_name'),
                    email=validated_data.get('email'),
                    phone_number=validated_data.get('phone_number'),
                )

        return user
    

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
