from django.shortcuts import render
import requests
from rest_framework import generics
from .models import CustomTable, CustomField
from .serializers import CustomTableSerializer, CustomFieldSerializer
from users.permissions import IsAdmin
from django.apps import apps
from django.http import JsonResponse, HttpResponseNotFound, HttpResponse
from django.db import connection
from django.db.utils import OperationalError, ProgrammingError
import json



class CustomTableListCreateView(generics.ListCreateAPIView):
    queryset = CustomTable.objects.all()
    serializer_class = CustomTableSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CustomTableRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomTable.objects.all()
    serializer_class = CustomTableSerializer
    permission_classes = [IsAdmin]

class CustomFieldListCreateView(generics.ListCreateAPIView):
    queryset = CustomField.objects.all()
    serializer_class = CustomFieldSerializer
    permission_classes = [IsAdmin]

class CustomFieldRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomField.objects.all()
    serializer_class = CustomFieldSerializer
    permission_classes = [IsAdmin]
    

def get_custom_table_data(request, table_name):
    # Ensure the table exists
    try:
        custom_table = CustomTable.objects.get(name=table_name, is_active=True)
    except CustomTable.DoesNotExist:
        return JsonResponse({'error': 'Table does not exist'}, status=404)

    # Fetch fields for the table
    fields = CustomField.objects.filter(table=custom_table)

    # Construct the SQL query
    field_names = ', '.join([field.name for field in fields])
    query = f"SELECT {field_names} FROM {table_name}"

    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

            # Convert rows to list of dictionaries
            columns = [col[0] for col in cursor.description]
            data = [dict(zip(columns, row)) for row in rows]

            return JsonResponse(data, safe=False)
    except OperationalError as e:
        return JsonResponse({'error': str(e)}, status=500)

def add_custom_table_data(request, table_name):
    # Ensure the table exists
    try:
        custom_table = CustomTable.objects.get(name=table_name, is_active=True)
    except CustomTable.DoesNotExist:
        return JsonResponse({'error': 'Table does not exist'}, status=404)

    # Check if request body is empty
    if not request.body:
        return JsonResponse({'error': 'Request body cannot be empty'}, status=400)

    try:
        # Parse the request body as JSON
        data = json.loads(request.body)

        # Basic validation: Check if all required fields are present
        fields = CustomField.objects.filter(table=custom_table)
        for field in fields:
            if field.required and field.name not in data:
                return JsonResponse({'error': f'Missing required field: {field.name}'}, status=400)
        
        # Construct the SQL query
        placeholders = ', '.join(['%s'] * len(data))
        columns = ', '.join(data.keys())
        values = tuple(data.values())
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

        with connection.cursor() as cursor:
            cursor.execute(query, values)

        return JsonResponse({'message': 'Data added successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except OperationalError as e:
        return JsonResponse({'error': str(e)}, status=500)

def custom_table_data_detail(request, table_name, pk):
    # Ensure the table exists
    try:
        custom_table = CustomTable.objects.get(name=table_name, is_active=True)
    except CustomTable.DoesNotExist:
        return JsonResponse({'error': 'Table does not exist'}, status=404)

    # Fetch fields for the table
    fields = CustomField.objects.filter(table=custom_table)
    field_names = [field.name for field in fields]

    if request.method == 'GET':
        # Construct the SQL query for retrieving a single row
        query = f"SELECT {', '.join(field_names)} FROM {table_name} WHERE id = %s"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, [pk])
                row = cursor.fetchone()

                if row:
                    # Convert the row to a dictionary
                    data = dict(zip(field_names, row))
                    return JsonResponse(data)
                else:
                    return JsonResponse({'error': 'Record not found'}, status=404)
        except OperationalError as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'PUT' or request.method == 'PATCH':
        try:
            # Parse the request body as JSON
            data = json.loads(request.body)

            # Basic validation: Check if all required fields are present for PUT
            if request.method == 'PUT':
                for field in fields:
                    if field.required and field.name not in data:
                        return JsonResponse({'error': f'Missing required field: {field.name}'}, status=400)

            # Construct the SQL query for updating the row
            update_fields = ', '.join([f"{key} = %s" for key in data.keys()])
            query = f"UPDATE {table_name} SET {update_fields} WHERE id = %s"
            values = list(data.values())
            values.append(pk)

            with connection.cursor() as cursor:
                cursor.execute(query, values)

            return JsonResponse({'message': 'Data updated successfully'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except OperationalError as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'DELETE':
        # Construct the SQL query for deleting the row
        query = f"DELETE FROM {table_name} WHERE id = %s"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, [pk])

            return JsonResponse({'message': 'Data deleted successfully'})
        except OperationalError as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    


def custom_tables_list(request):
    response = requests.get('http://127.0.0.1:8000/api/custom-tables/tables/')  # Replace with your API endpoint URL
    custom_tables = response.json() if response.status_code == 200 else []
    return render(request, 'custom_tables/custom_table_list.html', {'custom_tables': custom_tables})

def custom_table_form(request):
      return render(request, 'custom_tables/custom_table_form.html')

def custom_table_detail(request, pk):
    response = requests.get(f'http://127.0.0.1:8000/api/custom-tables/tables/{pk}/')
    custom_table = response.json() if response.status_code == 200 else None

    if custom_table:
        fields_response = requests.get(f'http://127.0.0.1:8000/api/custom-tables/fields/?table={custom_table["id"]}')
        fields = fields_response.json() if fields_response.status_code == 200 else []
    else:
        fields = []

    return render(request, 'custom_tables/custom_table_detail.html', {'custom_table': custom_table, 'fields': fields})

def custom_field_form(request, table_id):
    return render(request, 'custom_tables/custom_field_form.html', {'table_id': table_id})