from django.urls import path
from art.api import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),   
    # path('get-trends/', views.GetTrends.as_view(), name='get-trends'),
]
