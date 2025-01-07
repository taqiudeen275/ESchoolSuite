from django.apps import AppConfig


class CustomTablesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'custom_tables'


    def ready(self):
        import custom_tables.signals