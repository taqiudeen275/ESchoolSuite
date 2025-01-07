from django.db import models

from users.models import User

class CustomTable(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="custom_tables")
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Custom Table"
        verbose_name_plural = "Custom Tables"

    def __str__(self):
        return self.name

class CustomField(models.Model):
    table = models.ForeignKey(CustomTable, on_delete=models.CASCADE, related_name="fields")
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    data_type = models.CharField(
        max_length=20,
        choices=[
            ('CharField', 'Text'),
            ('IntegerField', 'Integer'),
            ('DecimalField', 'Decimal'),
            ('BooleanField', 'Boolean'),
            ('DateField', 'Date'),
            ('DateTimeField', 'Date & Time'),
            # Add more choices as needed
        ],
    )
    required = models.BooleanField(default=False)
    default_value = models.CharField(max_length=255, blank=True, null=True)
    help_text = models.CharField(max_length=255, blank=True, null=True)
    # For choices (e.g., dropdowns)
    choices = models.JSONField(blank=True, null=True)  # Store choices as JSON array

    class Meta:
        unique_together = ('table', 'name')  # Field names must be unique within a table

    def __str__(self):
        return f"{self.table.name} - {self.name}"