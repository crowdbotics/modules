from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter

from .viewsets import PaymentSheetView, GetStripePaymentsView, GetPaymentMethodsView, AppleIAPayment,\
    AppleIAProductsView


router = DefaultRouter()
router.register("apple/verify/receipt", AppleIAPayment, basename="apple-in-app")

urlpatterns = [
    re_path(r'apple/get_products/?', AppleIAProductsView.as_view()),
    re_path(r'payment_sheet/?', PaymentSheetView.as_view()),
    re_path(r'get_payments_history/?', GetStripePaymentsView.as_view()),
    re_path(r'get_payments_methods/?', GetPaymentMethodsView.as_view()),
    path("", include(router.urls)),
]