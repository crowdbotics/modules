from datetime import date
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Sum
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class Supplier(TimeStamp):
    name = models.CharField(max_length=120, unique=True)
    phone_number = PhoneNumberField(unique=True, null=True, blank=True)
    address = models.CharField(max_length=220)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "1 - Supplier"


class Category(TimeStamp):
    CATEGORY_CHOICES = (
        (1, 'Active'),
        (2, 'Inactive')
    )
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    status = models.PositiveIntegerField(choices=CATEGORY_CHOICES, default=1)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "2 - Category"


class Product(TimeStamp):
    PRODUCT_STATUS = (
        (1, 'Active'),
        (2, 'Inactive')
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product_category")
    code = models.CharField(max_length=256, blank=True, null=True)
    name = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.PositiveIntegerField(choices=PRODUCT_STATUS, default=1)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        verbose_name = "3 - Product"

    @property
    def available_stock(self):
        stock_in = self.product_stock.filter(type=1).aggregate(total_stock_in=Sum('quantity'))['total_stock_in'] or 0
        stock_out = self.product_stock.filter(type=2).aggregate(total_stock_out=Sum('quantity'))[
                        'total_stock_out'] or 0
        available = stock_in - stock_out
        return available


class Stock(TimeStamp):
    STOCK_TYPE = (
        (1, 'Stock-In'),
        (2, 'Stock-Out')
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_stock")
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    type = models.PositiveIntegerField(choices=STOCK_TYPE, default=1)

    def __str__(self):
        return self.product.code + ' - ' + self.product.name

    class Meta:
        verbose_name = "4 - Stock"


class Invoice(TimeStamp):
    INVOICE_TYPE = (
        (1, 'Sales Invoice'),
        (2, 'Overdue Invoice'),
        (3, 'Interim Invoice'),
        (4, 'Final Invoice'),
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='supplier_user')
    invoice_type = models.PositiveIntegerField(choices=INVOICE_TYPE, default=4)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    transaction = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    remaining_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    invoice_date = models.DateField(default=date.today)

    def __str__(self):
        return str(self.transaction)

    class Meta:
        verbose_name = "5 - Invoice"

    def quantity_count(self):
        return InvoiceItem.objects.filter(invoice=self).aggregate(Sum('quantity'))['quantity__sum']


class InvoiceItem(TimeStamp):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='invoice_item')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='invoiceitem_product')
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, blank=True, null=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return str(self.product.name)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """
        This save method override to get the product price in unit_price and sub_total in invoice total.
        """
        self.unit_price = self.product.price
        self.invoice.remaining_amount = (Decimal(self.unit_price) * Decimal(self.quantity)) - (Decimal(self.invoice.transaction))
        self.invoice.total_amount = Decimal(self.unit_price) * Decimal(self.quantity)
        self.invoice.save()
        super(InvoiceItem, self).save(force_insert=False, force_update=False, using=None,
                                      update_fields=None)

    class Meta:
        verbose_name = "6 - Invoice Item"
