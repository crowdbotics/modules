from django.urls import path

from .viewsets import ContactUs


urlpatterns = [
    path("contact_us/", ContactUs.as_view()),
]
