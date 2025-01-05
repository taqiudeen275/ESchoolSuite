from django.db import models
from users.models import User

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role__in': [User.Role.TEACHER, User.Role.STAFF, User.Role.ACCOUNTANT, User.Role.LIBRARIAN, User.Role.COUNSELOR]}, related_name='staff_profile')
    staff_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50, default='Ghanaian')
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    # add fields for staff role, qualification, experience, date joined
    qualification = models.CharField(max_length=100)
    experience = models.TextField(blank=True, null=True)
    date_joined = models.DateField()
    # add fields for social security number and bank details
    social_security_number = models.CharField(max_length=20, blank=True, null=True)
    bank_name = models.CharField(max_length=50, blank=True, null=True)
    bank_account_number = models.CharField(max_length=50, blank=True, null=True)
    bank_branch = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"