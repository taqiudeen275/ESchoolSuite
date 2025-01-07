from django.contrib import admin
from .models import CustomTable, CustomField

admin.site.register(CustomTable)
admin.site.register(CustomField)