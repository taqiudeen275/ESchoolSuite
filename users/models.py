from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Admin')
        TEACHER = 'TEACHER', _('Teacher')
        STUDENT = 'STUDENT', _('Student')
        PARENT = 'PARENT', _('Parent')
        STAFF = 'STAFF', _('Staff')
        ACCOUNTANT = 'ACCOUNTANT', _('Accountant')
        LIBRARIAN = 'LIBRARIAN', _('Librarian')
        COUNSELOR = 'COUNSELOR', _('Counselor')

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.ADMIN)

    # consider adding fields for profile picture
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    def __str__(self):
        return self.username