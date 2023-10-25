from django.urls import path, include
from rest_framework.routers import DefaultRouter

from modules.django_inventory_management.inventory_management.viewsets import *

router = DefaultRouter()

router.register("supplier", SupplierViewSet, basename="supplier")
router.register("category", CategoryViewSet, basename="category")
router.register("product", ProductViewSet, basename="product")
router.register("stock", StockViewSet, basename="stock")
router.register("invoice", InvoiceViewSet, basename="invoice")
router.register("invoice-item", InvoiceItemViewSet, basename="invoiceitem")

urlpatterns = [
    path("", include(router.urls)),
]
