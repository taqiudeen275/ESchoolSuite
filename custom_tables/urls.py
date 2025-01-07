from django.urls import path
from .views import (
    CustomTableListCreateView,
    CustomTableRetrieveUpdateDestroyView,
    CustomFieldListCreateView,
    CustomFieldRetrieveUpdateDestroyView,
    custom_field_form,
    custom_table_detail,
    custom_table_form,
    custom_tables_list,
     get_custom_table_data,
    add_custom_table_data,
    custom_table_data_detail,
)

urlpatterns = [
    path('tables/', CustomTableListCreateView.as_view(), name='custom-table-list-create'),
    path('tables/<int:pk>/', CustomTableRetrieveUpdateDestroyView.as_view(), name='custom-table-detail'),
    path('fields/', CustomFieldListCreateView.as_view(), name='custom-field-list-create'),
    path('fields/<int:pk>/', CustomFieldRetrieveUpdateDestroyView.as_view(), name='custom-field-detail'),
    
    path('data/<str:table_name>/', get_custom_table_data, name='get_custom_table_data'),
    path('data/<str:table_name>/add/', add_custom_table_data, name='add_custom_table_data'),
    path('data/<str:table_name>/<int:pk>/', custom_table_data_detail, name='custom_table_data_detail'),
    
     path('list/', custom_tables_list, name='custom_tables_list'),
    path('create/', custom_table_form, name='custom_table_form'),
    path('tables/<int:pk>/', custom_table_detail, name='custom_table_detail'),
    path('create-field/<int:table_id>/', custom_field_form, name='custom_field_form'),
]