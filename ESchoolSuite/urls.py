from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="ESchoolSuite API",
      default_version='v1',
      description="API documentation for ESchoolSuite",
      terms_of_service="",
      contact=openapi.Contact(email=""),
      license=openapi.License(name=""),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/students/', include('students.urls')),
    path('api/staff/', include('staff.urls')),
    path('api/academics/', include('academics.urls')),
    path('api/communications/', include('communications.urls')),
    path('api/accountants/', include('accountants.urls')),
    path('api/fees/', include('fees.urls')),
    path('api/counselors/', include('counselors.urls')),
    path('api/librarians/', include('librarians.urls')),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/reports/', include('reports.urls')),
    path('api/custom_tables/', include('custom_tables.urls')),
    
     
    
       # Swagger documentation URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]

# add static and media urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)