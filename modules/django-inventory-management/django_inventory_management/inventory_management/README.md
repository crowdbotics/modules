## Django Inventory Management backend configuration and information

## Module description

This module will be used to get information on products and their categories. It provides real-time updates on product
availability, stock levels, invoice statuses, as well as information about suppliers and their invoice items.

The following are the scope features of this module.

- Ability to add and view a list of categories with active/inactive status.
- Ability to add and view a list of products with active/inactive status.
- Ability to add, update, delete, and verify that the product is in stock or not.
- Ability to add or remove products in stock with active statuses.
- Ability to add and view different types (Sales invoice, Overdue invoice, Interim invoice, Final invoice) of invoices
  with supplier details.
- Ability to create and list invoice items with complete details like price, quantity, stock, and invoice.
- Ability to create and list invoices against suppliers.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No Environment variables needed.

## 3rd party setup

No third-party account creation needed.

## Dependencies

[Django Phonenumbers](https://github.com/daviddrysdale/python-phonenumbers/blob/dev/README.md)

Dependencies used:

- [django-phonenumbers](https://pypi.org/project/django-phonenumbers/)

## API details

API Endpoints and Required Parameters List.

| Api Name                                                      |                                          Param                                          | Description                                                              |
|---------------------------------------------------------------|:---------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------|
| `/modules/inventory-management/category/` `{POST}`            |                         body_params `name, status, description`                         | Takes name, status, and description of the category.                     |
| `/modules/inventory-management/category/{id}/` `{PUT}`        |            body_params `name, status, description` path_params `category_id`            | Takes name, status, and description and update the category.             |
| `/modules/inventory-management/category/{id}/` `{GET}`        |                                path_params `category_id`                                | Takes category id and return a specific category details.                |
| `/modules/inventory-management/category/{id}/` `{DELETE}`     |                                path_params `category_id`                                | Delete the category.                                                     |
| `/modules/inventory-management/category/` `{GET}`             |                                            -                                            | Get list of the categories.                                              |
| `/modules/inventory-management/product/` `{POST}`             |             body_params `name, status, description, category, code, price`              | Takes name, status, code, price, and description of the product.         |
| `/modules/inventory-management/product/{id}/` `{PUT}`         | body_params `name, status, description, category, code, price` path_params `product_id` | Takes name, status, code, price, and description and update the product. |
| `/modules/inventory-management/product/{id}/` `{GET}`         |                                path_params `product_id`                                 | Takes product id and return a specific product details.                  |
| `/modules/inventory-management/product/{id}/` `{DELETE}`      |                                path_params `product_id`                                 | Delete the product.                                                      |
| `/modules/inventory-management/product/` `{GET}`              |                                            -                                            | Get list of the products.                                                |
| `/modules/inventory-management/stock/` `{POST}`               |                          body_params `quantity, type, product`                          | Takes quantity, type, and product of the stock.                          |
| `/modules/inventory-management/stock/{id}/` `{PUT}`           |              body_params `quantity, type, product` path_params `stock_id`               | Takes quantity, type, and product, update the product.                   |
| `/modules/inventory-management/stock/{id}/` `{GET}`           |                                 path_params `stock_id`                                  | Takes stock id and return a specific stock details.                      |
| `/modules/inventory-management/stock/{id}/` `{DELETE}`        |                                 path_params `stock_id`                                  | Delete the stock.                                                        |
| `/modules/inventory-management/stock/` `{GET}`                |                                            -                                            | Get list of the stocks.                                                  |
| `/modules/inventory-management/supplier/` `{POST}`            |                        body_params `phone_number, name, address`                        | Takes name, phone_number, and address of the supplier.                   |
| `/modules/inventory-management/supplier/{id}/` `{PUT}`        |           body_params `phone_number, name, address` path_params `supplier_id`           | Takes name, phone_number, and address, update the supplier.              |
| `/modules/inventory-management/supplier/{id}/` `{GET}`        |                                path_params `supplier_id`                                | Takes supplier id and return a specific supplier details.                |
| `/modules/inventory-management/supplier/{id}/` `{DELETE}`     |                                path_params `supplier_id`                                | Delete the supplier.                                                     |
| `/modules/inventory-management/supplier/` `{GET}`             |                                            -                                            | Get list of the supplier.                                                |
| `/modules/inventory-management/invoice/` `{POST}`             |                    body_params `invoice_type, transaction, supplier`                    | Takes invoice_type, transaction, and supplier of the invoice.            |
| `/modules/inventory-management/invoice/{id}/` `{PUT}`         |       body_params `invoice_type, transaction, supplier` path_params `invoice_id`        | Takes invoice_type, transaction, and supplier, update the invoice.       |
| `/modules/inventory-management/invoice/{id}/` `{GET}`         |                                path_params `invoice_id`                                 | Takes invoice id and return a specific invoice details.                  |
| `/modules/inventory-management/invoice/{id}/` `{DELETE}`      |                                path_params `invoice_id`                                 | Delete the invoice.                                                      |
| `/modules/inventory-management/invoice/` `{GET}`              |                                            -                                            | Get list of the invoice.                                                 |
| `/modules/inventory-management/invoice-item/` `{POST}`        |                     body_params `invoice, quantity, product, stock`                     | Takes invoice, quantity, product, and stock of the invoice item.         |
| `/modules/inventory-management/invoice-item/{id}/` `{PUT}`    |      body_params `invoice, quantity, product, stock` path_params `invoice-item_id`      | Takes invoice, quantity, product, and stock, update the invoice item.    |
| `/modules/inventory-management/invoice-item/{id}/` `{GET}`    |                              path_params `invoice-item_id`                              | Takes invoice id and return a specific invoice item details.             |
| `/modules/inventory-management/invoice-item/{id}/` `{DELETE}` |                              path_params `invoice-item_id`                              | Delete the invoice item.                                                 |
| `/modules/inventory-management/invoice-item/` `{GET}`         |                                            -                                            | Get list of the invoice item.                                            |