from django.contrib import admin
from .models import Fee, Payment

@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ('student', 'name', 'amount', 'due_date')
    list_filter = ('due_date',)
    search_fields = ('student__user__first_name', 'student__user__last_name', 'name', 'description')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('fee', 'amount_paid', 'payment_date', 'transaction_id', 'status')
    list_filter = ('status', 'payment_date')
    search_fields = ('fee__student__user__first_name', 'fee__student__user__last_name', 'fee__name', 'transaction_id')