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
        ('1', 'Active'),
        ('2', 'Inactive')
    )
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=2, choices=CATEGORY_CHOICES, default=1)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "2 - Category"


class Product(TimeStamp):
    PRODUCT_STATUS = (
        ('1', 'Active'),
        ('2', 'Inactive')
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product_category")
    code = models.CharField(max_length=256, blank=True, null=True)
    name = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=2, choices=PRODUCT_STATUS, default=1)

    def __str__(self):
        return self.code + ' - ' + self.name

    class Meta:
        verbose_name = "3 - Product"

    @property
    def available_stock(self):
        """
        This method "available_stock" shows the remaining amount of available stocks
        """
        stocks = Stock.objects.filter(product=self)
        stock_in = 0
        stock_out = 0
        for stock in stocks:
            if stock.type == '1':
                stock_in = int(stock_in) + int(stock.quantity)
            else:
                stock_out = int(stock_out) + int(stock.quantity)
        available = stock_in - stock_out
        return available


class Stock(TimeStamp):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_stock")
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    type = models.CharField(max_length=2, choices=(('1', 'Stock-in'), ('2', 'Stock-Out')), default=1)

    def __str__(self):
        return self.product.code + ' - ' + self.product.name

    class Meta:
        verbose_name = "4 - Stock"


class Invoices(TimeStamp):
    PRODUCT_STATUS = (
        ('1', 'Sales Invoice'),
        ('2', 'Overdue Invoice'),
        ('3', 'Interim Invoice'),
        ('4', 'Final Invoice'),
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='supplier_user')
    invoice_type = models.CharField(max_length=2, choices=PRODUCT_STATUS)
    transaction = models.CharField(max_length=250)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    invoice_date = models.DateField(default=date.today)

    def __str__(self):
        return self.transaction

    class Meta:
        verbose_name = "5 - Invoice"

    def quantity_count(self):
        return InvoiceItem.objects.filter(invoice=self).aggregate(Sum('quantity'))['quantity__sum']


class InvoiceItem(TimeStamp):
    invoice = models.ForeignKey(Invoices, on_delete=models.CASCADE, related_name='invoice_item')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='invoiceitem_product')
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, blank=True, null=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.invoice.invoice_type

    def sub_total(self):
        """
        This method calculates the total invoice amount by deducting the total unit prices of invoice items from the
        invoice transaction amount, considering the remaining amount.
        """
        total = Decimal(self.unit_price) * Decimal(self.quantity)
        value = Decimal(total) - Decimal(self.invoice.transaction)
        return value

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """
        This save method override to get the product price in unit_price and sub_total in invoice total.
        """
        self.unit_price = self.product.price
        self.invoice.total = self.sub_total()
        self.invoice.save()
        super(InvoiceItem, self).save(force_insert=False, force_update=False, using=None,
                                      update_fields=None)

    class Meta:
        verbose_name = "6 - Invoice Item"
