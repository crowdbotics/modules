from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAdminUser

from modules.django_inventory_management.inventory_management.serializers import *


class SupplierViewSet(viewsets.ModelViewSet):
    """
     Supplier viewsets provide CRUD functionality:
      - Create : create the supplier
      - Get: get the supplier's specific detail by ID
      - Delete : delete the supplier by ID
      - Patch : Edit the supplier ID
     """
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    serializer_class = SupplierSerializer
    queryset = Supplier.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    """
       Category viewsets provide CRUD functionality:
       - Create : create the category
       - Get: get the category's specific detail by ID
       - Delete : delete the category by ID
       - Patch : Edit the category ID
      """
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Category.objects.all()


class ProductViewSet(viewsets.ModelViewSet):
    """
       Product viewsets provide CRUD functionality:
       - Create : create the product
       - Get: get the product's specific detail by ID
       - Delete : delete the product by ID
       - Patch : Edit the product ID
      """
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Product.objects.all()


class StockViewSet(viewsets.ModelViewSet):
    """
       Stock viewsets provide CRUD functionality:
       - Create : create the stock
       - Get: get the stock's specific detail by ID
       - Delete : delete the stock by ID
       - Patch : Edit the stock ID
      """
    serializer_class = StockSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Stock.objects.all()


class InvoiceViewSet(viewsets.ModelViewSet):
    """
       Invoice viewsets provide CRUD functionality:
       - Create : create the invoice
       - Get: get the invoice's specific detail by ID
       - Delete : delete the invoice by ID
       - Patch : Edit the invoice ID
      """
    serializer_class = InvoiceSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Invoices.objects.all()


class InvoiceItemViewSet(viewsets.ModelViewSet):
    """
       Invoice item viewsets provide CRUD functionality:
       - Create : create the invoice
       - Get: get the invoice item's specific detail by ID
       - Delete : delete the invoice item by ID
       - Patch : Edit the invoice item ID
      """
    serializer_class = InvoiceItemSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = InvoiceItem.objects.all()
