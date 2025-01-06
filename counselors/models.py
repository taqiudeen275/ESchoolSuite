from django.db import models
from students.models import Student
from users.models import User


class CounselingSession(models.Model):
    counselor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="counseling_sessions", limit_choices_to={'role': User.Role.COUNSELOR})
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="counseling_sessions")
    session_date = models.DateTimeField()
    notes = models.TextField()
    summary = models.TextField(blank=True, null=True)
    is_confidential = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.counselor.get_full_name()} - {self.student.user.get_full_name()} - {self.session_date}"