from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=20, unique=True)
    publisher = models.CharField(max_length=255)
    publication_year = models.IntegerField()
    genre = models.CharField(max_length=50)
    copies_available = models.IntegerField(default=0)
    total_copies = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class BorrowingRecord(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrowing_records')
    student = models.ForeignKey('students.Student', on_delete=models.SET_NULL, null=True, blank=True, related_name='borrowed_books')
    staff = models.ForeignKey('staff.Staff', on_delete=models.SET_NULL, null=True, blank=True, related_name='borrowed_books')
    borrow_date = models.DateField(default=timezone.now)
    due_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=(('Borrowed', 'Borrowed'), ('Returned', 'Returned'), ('Overdue', 'Overdue')), default='Borrowed')

    class Meta:
        unique_together = ('book', 'student', 'borrow_date')

    def __str__(self):
        return f"{self.book.title} - {self.student.user.get_full_name() if self.student else self.staff.user.get_full_name()} - {self.borrow_date}"

    def save(self, *args, **kwargs):
        if not self.pk:  # If this is a new record
            if self.book.copies_available <= 0:
                raise Exception("No copies available for borrowing.")
            self.book.copies_available -= 1
            self.book.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.book.copies_available += 1
        self.book.save()
        super().delete(*args, **kwargs)