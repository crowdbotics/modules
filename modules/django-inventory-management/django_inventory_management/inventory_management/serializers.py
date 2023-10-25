from rest_framework import serializers

from modules.django_inventory_management.inventory_management.models import *


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    stock_availability = serializers.CharField(source='available_stock', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = Invoices
        fields = '__all__'


class InvoiceItemSerializer(serializers.ModelSerializer):
    remaining_amount = serializers.CharField(source='sub_total', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    invoice_detail = serializers.CharField(source='invoice.transaction', read_only=True)
    status = serializers.CharField(source='stock.type', read_only=True)

    class Meta:
        model = InvoiceItem
        fields = '__all__'
