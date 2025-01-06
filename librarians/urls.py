from django.urls import path
from .views import (
    BookListCreateView,
    BookRetrieveUpdateDestroyView,
    BorrowingRecordListCreateView,
    BorrowingRecordRetrieveUpdateDestroyView,
    OverdueBookListView,
)

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-retrieve-update-destroy'),
    path('borrowing-records/', BorrowingRecordListCreateView.as_view(), name='borrowing-record-list-create'),
    path('borrowing-records/<int:pk>/', BorrowingRecordRetrieveUpdateDestroyView.as_view(), name='borrowing-record-retrieve-update-destroy'),
    path('overdue-books/', OverdueBookListView.as_view(), name='overdue-book-list'),
]