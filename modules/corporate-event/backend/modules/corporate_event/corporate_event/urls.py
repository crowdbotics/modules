from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/', include('modules.corporate_event.corporate_event.api.v1.urls')),
]