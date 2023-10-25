from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import *

User = get_user_model()


class SupplierViewsetsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.supplier = Supplier.objects.create(name="john", phone_number="+923111111111", address="uk")

    def test_create_supplier(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("supplier-list")
        data = {
            "name": "CB demo",
            "phone_number": "+923112352562'",
            "address": "mlt"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_supplier_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("supplier-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['name'], 'john')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_supplier(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("supplier-detail", kwargs={'pk': self.supplier.id})
        data = {
            "name": "walker",
            "phone_number": "+923112312312'",
            "address": "uk"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_supplier(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("supplier-detail", kwargs={'pk': self.supplier.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_supplier_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("supplier-detail", kwargs={'pk': self.supplier.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['address'], 'uk')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_supplier_with_invalid_authorization(self):
        url = reverse("supplier-detail", kwargs={'pk': self.supplier.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CategoryViewsetsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.category = Category.objects.create(name="clothes", description="winter", status="1")

    def test_create_category(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("category-list")
        data = {
            "name": "shoes",
            "description": "for winter",
            "status": "1"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_category_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("category-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['name'], 'clothes')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_supplier(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("category-detail", kwargs={'pk': self.category.id})
        data = {
            "name": "Shoe",
            "description": "for winter",
            "status": "2"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_category_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("category-detail", kwargs={'pk': self.category.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['description'], 'winter')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_category(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("category-detail", kwargs={'pk': self.category.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_category_with_invalid_authorization(self):
        url = reverse("category-detail", kwargs={'pk': self.category.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProductViewsetsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.category = Category.objects.create(name="clothes", description="winter", status="1")
        self.product = Product.objects.create(name="clothes", description="winter", status="1", code="11223",
                                              price="250.0", category=self.category)

    def test_create_product(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("product-list")
        data = {
            "category": self.category.id,
            "code": "112",
            "name": "pent",
            "description": "for winter",
            "price": 250.0,
            "status": "1"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_product_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("product-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['name'], 'clothes')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_product(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("product-detail", kwargs={'pk': self.product.id})
        data = {
            "category": self.category.id,
            "code": "112",
            "name": "pent",
            "description": "for winter",
            "price": 250.0,
            "status": "1"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_product_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("product-detail", kwargs={'pk': self.product.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['description'], 'winter')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("product-detail", kwargs={'pk': self.product.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_product_with_invalid_authorization(self):
        url = reverse("product-detail", kwargs={'pk': self.product.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class StockViewsetsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.category = Category.objects.create(name="clothes", description="winter", status="1")
        self.product = Product.objects.create(name="clothes", description="winter", status="1", code="11223",
                                              price="250.0", category=self.category)
        self.stock = Stock.objects.create(product=self.product, quantity="35.0", type="1")

    def test_create_stock(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("stock-list")
        data = {
            "quantity": '40.00',
            "type": "1",
            "product": self.product.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['quantity'], data['quantity'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_stock_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("stock-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['quantity'], '35.00')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_stock(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("stock-detail", kwargs={'pk': self.stock.id})
        data = {
            "quantity": '40.00',
            "type": "1",
            "product": self.product.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.data['quantity'], data['quantity'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_stock_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("stock-detail", kwargs={'pk': self.stock.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['quantity'], '35.00')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_stock(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("stock-detail", kwargs={'pk': self.stock.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_stock_with_invalid_authorization(self):
        url = reverse("stock-detail", kwargs={'pk': self.stock.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class InvoiceViewsetsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.supplier = Supplier.objects.create(name="john", phone_number="+923111111111", address="uk")
        self.invoice = Invoices.objects.create(supplier=self.supplier, transaction="400.0", invoice_type="2")

    def test_create_invoice(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoice-list")
        data = {
            "invoice_type": "1",
            "transaction": "300",
            "supplier": self.supplier.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['transaction'], data['transaction'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_invoice_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoice-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['transaction'], '400.0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invoice(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoice-detail", kwargs={'pk': self.invoice.id})
        data = {
            "invoice_type": "3",
            "transaction": "600",
            "supplier": self.supplier.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.data['transaction'], data['transaction'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invoice_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoice-detail", kwargs={'pk': self.invoice.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['transaction'], '400.0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_invoice(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoice-detail", kwargs={'pk': self.invoice.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_invoice_with_invalid_authorization(self):
        url = reverse("invoice-detail", kwargs={'pk': self.invoice.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class InvoiceItemViewsetsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_superuser(username="david", email="demo@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.supplier = Supplier.objects.create(name="john", phone_number="+923111111111", address="uk")
        self.invoice = Invoices.objects.create(supplier=self.supplier, transaction="400.0", invoice_type="2")
        self.category = Category.objects.create(name="clothes", description="winter", status="1")
        self.product = Product.objects.create(name="clothes", description="winter", status="1", code="11223",
                                              price="250.0", category=self.category)
        self.stock_1 = Stock.objects.create(product=self.product, quantity=35, type="1")
        self.stock_2 = Stock.objects.create(product=self.product, quantity=20, type='2')
        self.invoice_item = InvoiceItem.objects.create(product=self.product, stock=self.stock_1, invoice=self.invoice,
                                                       quantity=4.00)

    def test_create_invoice_item(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoiceitem-list")
        data = {
            "quantity": '2.00',
            "invoice": self.invoice.id,
            "product": self.product.id,
            "stock": self.stock_1.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['quantity'], data['quantity'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_invoice_item_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoiceitem-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.data[0]['quantity'], '4.00')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invoice_item(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoiceitem-detail", kwargs={'pk': self.invoice_item.id})
        data = {
            "quantity": 3.0,
            "invoice": self.invoice.id,
            "product": self.product.id,
            "stock": self.stock_1.id
        }
        response = self.client.put(url, data, format='json')
        self.assertNotEquals(response.data['quantity'], data['quantity'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invoice_item_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoiceitem-detail", kwargs={'pk': self.invoice_item.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['quantity'], '4.00')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_invoice_item(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse("invoiceitem-detail", kwargs={'pk': self.invoice_item.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_invoice_item_with_invalid_authorization(self):
        url = reverse("invoiceitem-list")
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_available_stock(self):
        product = Product.objects.get(name="clothes")
        expected_available_stock = 35 - 20
        actual_available_stock = product.available_stock
        self.assertEqual(actual_available_stock, expected_available_stock)

    def test_quantity_count(self):
        invoice = Invoices.objects.get(id=self.invoice.id)
        expected_quantity_count = InvoiceItem.objects.filter(invoice=invoice).aggregate(Sum('quantity'))[
            'quantity__sum']
        actual_quantity_count = invoice.quantity_count()
        self.assertEqual(actual_quantity_count, expected_quantity_count)


class StrModelReturnTestCase(APITestCase):
    def setUp(self):
        self.supplier = Supplier.objects.create(name="john", phone_number="+923111111111", address="uk")
        self.invoice = Invoices.objects.create(supplier=self.supplier, transaction="400.0", invoice_type="2")
        self.category = Category.objects.create(name="clothes", description="winter", status="1")
        self.product = Product.objects.create(name="clothes", description="winter", status="1", code="11223",
                                              price="250.0", category=self.category)
        self.stock_1 = Stock.objects.create(product=self.product, quantity=35, type="1")
        self.stock_2 = Stock.objects.create(product=self.product, quantity=20, type='2')
        self.invoice_item = InvoiceItem.objects.create(product=self.product, stock=self.stock_1, invoice=self.invoice,
                                                       quantity=4.00)
        self.invoice_item_1 = InvoiceItem.objects.create(product=self.product, stock=self.stock_1, invoice=self.invoice,
                                                         quantity=5.00)

    def test_str_method_Invoice(self):
        str_representation = str(self.invoice)
        expected_str_representation = self.invoice.transaction
        self.assertEqual(str_representation, expected_str_representation)

    def test_str_method_Supplier(self):
        str_representation = str(self.supplier)
        expected_str_representation = self.supplier.name
        self.assertEqual(str_representation, expected_str_representation)

    def test_str_method_Category(self):
        str_representation = str(self.category)
        expected_str_representation = self.category.name
        self.assertEqual(str_representation, expected_str_representation)

    def test_str_method_Product(self):
        str_representation = str(self.product)
        expected_str_representation = self.product.code + ' - ' + self.product.name
        self.assertEqual(str_representation, expected_str_representation)

    def test_str_method_Stock(self):
        str_representation = str(self.stock_1)
        expected_str_representation = self.stock_1.product.code + ' - ' + self.stock_1.product.name
        self.assertEqual(str_representation, expected_str_representation)

    def test_str_method_InvoiceItem(self):
        str_representation = str(self.invoice_item)
        expected_str_representation = self.invoice_item.invoice.invoice_type
        self.assertEqual(str_representation, expected_str_representation)
