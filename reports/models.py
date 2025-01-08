from django.db import models
from students.models import Student
from django.conf import settings
from cloudinary.models import CloudinaryField
import os

class ReportCard(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='report_cards')
    term = models.CharField(max_length=50)  # e.g., "Term 1", "Term 2"
    academic_year = models.CharField(max_length=20)  # e.g., "2023-2024"
    generated_date = models.DateTimeField(auto_now_add=True)
    pdf_file = CloudinaryField('report_card_pdf', resource_type='raw', format='pdf', folder='report_cards/')
    
    def __str__(self):
        return f"Report Card - {self.student.user.get_full_name()} - {self.term} {self.academic_year}"

    def get_download_url(self):
        if self.pdf_file:
            return os.path.join(settings.MEDIA_URL, self.pdf_file.name)
        return None