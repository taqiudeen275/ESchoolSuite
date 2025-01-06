import os
from django.db import models
from users.models import Parent, User
from django.utils import timezone
from django.core.exceptions import ValidationError


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': User.Role.STUDENT}, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50) # e.g., Greater Accra, Ashanti
    nationality = models.CharField(max_length=50, default='Ghanaian')
    # add more fields for contact details and guardian information, admission_number
    email = models.EmailField(unique=True)  # Consider making this optional
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    admission_number = models.CharField(max_length=20, unique=True)
    admission_date = models.DateField()
    # emergency contacts
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)
    emergency_contact_relationship = models.CharField(max_length=50)
    # medical information
    medical_conditions = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    # previous school information
    previous_school_name = models.CharField(max_length=100, blank=True, null=True)
    previous_school_address = models.CharField(max_length=255, blank=True, null=True)
    previous_school_contact = models.CharField(max_length=20, blank=True, null=True)
    # add fields for religion and denomination
    religion = models.CharField(max_length=50, blank=True, null=True)
    denomination = models.CharField(max_length=50, blank=True, null=True)
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

def validate_file_extension(value):
    allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png']
    ext = os.path.splitext(value.name)[1]
    if not ext.lower() in allowed_extensions:
        raise ValidationError('Unsupported file extension. Allowed extensions are .pdf, .jpg, .jpeg, .png.')

def validate_file_size(value):
    max_size = 5 * 1024 * 1024  # 5 MB
    if value.size > max_size:
        raise ValidationError('File size too large. Maximum file size allowed is 5 MB.')

class AdmissionApplication(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        REVIEWED = 'REVIEWED', 'Reviewed'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        REJECTED = 'REJECTED', 'Rejected'

    # Basic Information
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)

    # Contact Information
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50, default='Ghanaian')

    # Guardian Information
    guardian_name = models.CharField(max_length=255)
    guardian_phone_number = models.CharField(max_length=20)
    guardian_email = models.EmailField()
    guardian_relationship = models.CharField(max_length=50)

    # Other Information
    previous_school = models.CharField(max_length=255, blank=True, null=True)
    application_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    # Document Uploads
    birth_certificate = models.FileField(upload_to='admission_documents/', blank=True, null=True)
    transcript = models.FileField(upload_to='admission_documents/', blank=True, null=True)
     # Document Uploads (with validations)
    birth_certificate = models.FileField(
        upload_to='admission_documents/',
        blank=True,
        null=True,
        validators=[validate_file_extension, validate_file_size]
    )
    transcript = models.FileField(
        upload_to='admission_documents/',
        blank=True,
        null=True,
        validators=[validate_file_extension, validate_file_size]
    )
    passport_photo = models.FileField(
        upload_to='admission_documents/',
        blank=True,
        null=True,
        validators=[validate_file_extension, validate_file_size]
    )

    # Additional Fields
    program_of_study = models.CharField(max_length=255, blank=True, null=True)  # e.g., "Science", "Business", "General Arts"
    notes = models.TextField(blank=True, null=True)  # For internal notes by reviewers


    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.application_date}"