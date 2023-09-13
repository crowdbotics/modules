from django.urls import path, include, re_path
from rest_framework import routers
from .api_extensions.views.basket import BasketLineUpdateDetail

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^basket-update/?$', BasketLineUpdateDetail.as_view()),
]