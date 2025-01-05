from django.db import models
from users.models import User

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

    def __str__(self):
        return f"{self.first_name} {self.last_name}"