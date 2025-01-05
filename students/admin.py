from django.contrib import admin

# Register your models here.
admin.site.site_header = "ESchoolSuite Admin"
admin.site.site_title = "ESchoolSuite Admin Portal"
admin.site.index_title = "Welcome to ESchoolSuite Portal"
from .models import Student
admin.site.register(Student)