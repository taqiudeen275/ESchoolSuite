from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import CustomTable, CustomField
from django.db import connection
import json

@receiver(post_save, sender=CustomTable)
def create_table(sender, instance, created, **kwargs):
    if created:
        with connection.schema_editor() as schema_editor:
            table_name = instance.name
            # Define the SQL statement to create the table
            sql = f"CREATE TABLE {table_name} (id INT AUTO_INCREMENT PRIMARY KEY)"
            schema_editor.execute(sql)

@receiver(post_delete, sender=CustomTable)
def delete_table(sender, instance, **kwargs):
    with connection.schema_editor() as schema_editor:
        table_name = instance.name
        # Define the SQL statement to drop the table
        sql = f"DROP TABLE {table_name}"
        schema_editor.execute(sql)

@receiver(post_save, sender=CustomField)
def add_column(sender, instance, created, **kwargs):
    if created:
        with connection.schema_editor() as schema_editor:
            table_name = instance.table.name
            column_name = instance.name
            column_type = instance.data_type
            # Handle data type choices
            if column_type == 'CharField':
                column_type = f"VARCHAR(255)"
            elif column_type == 'IntegerField':
                column_type = "INT"
            elif column_type == 'BooleanField':
                column_type = "BOOLEAN"
            elif column_type == 'DateField':
                column_type = "DATE"
            elif column_type == 'DateTimeField':
                column_type = "DATETIME"
            elif column_type == 'DecimalField':
                column_type = "DECIMAL"
            # Handle JSON data type for choices
            elif column_type == 'JSONField':
                column_type = "JSON"

            # Handle null constraints
            null_constraint = "" if instance.required else "NULL"

            # Handle choices for CharField
            if instance.data_type == 'CharField' and instance.choices:
                choices = ", ".join([f"'{choice}'" for choice in instance.choices])
                column_type = f"VARCHAR(255) CHECK ({column_name} IN ({choices}))"

            # Define the SQL statement to add the column
            sql = f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type} {null_constraint}"
            schema_editor.execute(sql)

@receiver(post_delete, sender=CustomField)
def remove_column(sender, instance, **kwargs):
    with connection.schema_editor() as schema_editor:
        table_name = instance.table.name
        column_name = instance.name
        # Define the SQL statement to remove the column
        sql = f"ALTER TABLE {table_name} DROP COLUMN {column_name}"
        schema_editor.execute(sql)