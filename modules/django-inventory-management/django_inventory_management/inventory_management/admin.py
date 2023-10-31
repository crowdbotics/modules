from django.contrib import admin

from .models import Supplier, Category, Product, Stock, Invoice, InvoiceItem


class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'address', 'created_at', 'updated_at',)
    search_fields = ('role', 'name', 'phone_number', 'address')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'status')
    search_fields = ('name', 'description', 'status')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'code', 'description', 'price', 'status', 'available_stock', 'updated_at',)
    search_fields = ('name', 'category', 'code', 'description', 'price', 'status')


class StockAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'type', 'created_at', 'updated_at',)
    search_fields = ('product', 'quantity', 'type',)


class InvoiceAdmin(admin.ModelAdmin):
    list_display = (
        'transaction', 'supplier', 'total_amount', 'quantity_count', 'invoice_type', 'invoice_date', 'remaining_amount',)
    search_fields = ('transaction', 'supplier', 'invoice_type', 'invoice_date',)


class InvoiceItemAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'product', 'stock', 'unit_price', 'quantity', 'created_at', 'updated_at',)
    search_fields = ('invoice', 'product', 'stock',)


admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(Invoice, InvoiceAdmin)
admin.site.register(InvoiceItem, InvoiceItemAdmin)
