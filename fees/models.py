from django.db import models
from students.models import Student
from django.core.validators import MinValueValidator

class Fee(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='fees')
    name = models.CharField(max_length=100) # e.g., "Tuition Fee", "Book Fee"
    description = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0, message="Amount cannot be negative.")])
    due_date = models.DateField()

    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.name} - Due: {self.due_date}"

class Payment(models.Model):
    fee = models.ForeignKey(Fee, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0, message="Amount paid cannot be negative.")])
    payment_date = models.DateField()
    transaction_id = models.CharField(max_length=100, blank=True, null=True) # For storing transaction IDs from payment gateways
    payment_method = models.CharField(max_length=50, blank=True, null=True) # e.g., "Credit Card", "Bank Transfer"
    status = models.CharField(max_length=20, choices=(('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')), default='Pending')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.fee.student.user.get_full_name()} - {self.fee.name} - Paid: {self.amount_paid} on {self.payment_date}"