from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.api.urls')),
    path('api/art/', include('art.api.urls')),
]
