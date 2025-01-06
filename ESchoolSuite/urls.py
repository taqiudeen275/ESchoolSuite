from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

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
]

# add static and media urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)