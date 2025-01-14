from django.utils import timezone
from django.db import models
from users.models import User
from django.core.validators import MinValueValidator
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
import re

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,blank=True, null=True, limit_choices_to={'role__in': [User.Role.TEACHER, User.Role.STAFF, User.Role.ACCOUNTANT, User.Role.LIBRARIAN, User.Role.COUNSELOR]}, related_name='staff_profile')
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
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, validators=[MinValueValidator(0, message="Salary cannot be negative.")])

    def generate_staff_id(self):
        """Generates a unique staff ID with a sequence."""
        year = str(timezone.now().year)[-2:]
        prefix = f"ST-{year}"

        # Find the last Staff ID with the same prefix
        last_staff = Staff.objects.filter(
            user__username__startswith=prefix
        ).order_by('-user__username').first()

        if last_staff:
            # Extract the last number and increment it
            last_number = int(re.findall(r'\d+', last_staff.user.username)[-1])
            new_number = last_number + 1
        else:
            # Start from 1 if no previous staff ID with the same prefix
            new_number = 1

        return f"{prefix}-{new_number:04d}"

    def save(self, *args, **kwargs):
        if not self.pk:
            if not self.user_id:
                # Auto-create a User instance only if user is not provided
                user = User.objects.create(
                    username=self.generate_staff_id(),
                    email=self.email,
                    role=User.Role.STAFF,
                    first_name=self.first_name,
                    last_name=self.last_name
                )
                user.set_password(settings.DEFAULT_STAFF_PASSWORD)
                user.save()
                self.user = user
            self.staff_id = self.user.username
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    

class Payroll(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='payroll_records')
    start_date = models.DateField()
    end_date = models.DateField()
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0, message="Salary cannot be negative.")])
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, validators=[MinValueValidator(0, message="Allowances cannot be negative.")])
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, validators=[MinValueValidator(0, message="Deductions cannot be negative.")])
    net_pay = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0, message="Net pay cannot be negative.")])
    payment_date = models.DateField()
    status = models.CharField(max_length=20, choices=(('Pending', 'Pending'), ('Paid', 'Paid')), default='Pending')
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('staff', 'start_date', 'end_date')  # Prevents duplicate payroll records

    def __str__(self):
        return f"{self.staff} - {self.start_date} to {self.end_date} - Net Pay: {self.net_pay}"

    def calculate_net_pay(self):
        self.net_pay = self.basic_salary + self.allowances - self.deductions

    def save(self, *args, **kwargs):
        self.calculate_net_pay()
        super().save(*args, **kwargs)