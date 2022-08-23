# E-Commerce Module
This module will allow the user to add products, add to cart, checkout information, provide an address, and use different payment methods.This module uses Django Oscar API package that provides a RESTful API for django-oscar, it's based on django-rest-framework and it exposes most of Oscar's functionality.


## Project settings

1. First, edit your settings file settings.py to import all of Oscar’s default settings.
```
from oscar.defaults import *
```

2. Next, modify `INSTALLED_APPS` list, and add  Oscar’s core apps, and third-party apps that Oscar depends on.

```console
    'django.contrib.flatpages',
    'oscar.config.Shop',
    'oscar.apps.analytics.apps.AnalyticsConfig',
    'oscar.apps.checkout.apps.CheckoutConfig',
    'oscar.apps.address.apps.AddressConfig',
    'oscar.apps.shipping.apps.ShippingConfig',
    'oscar.apps.catalogue.apps.CatalogueConfig',
    'oscar.apps.catalogue.reviews.apps.CatalogueReviewsConfig',
    'oscar.apps.communication.apps.CommunicationConfig',
    'oscar.apps.partner.apps.PartnerConfig',
    'oscar.apps.basket.apps.BasketConfig',
    'oscar.apps.payment.apps.PaymentConfig',
    'oscar.apps.offer.apps.OfferConfig',
    'oscar.apps.order.apps.OrderConfig',
    'oscar.apps.customer.apps.CustomerConfig',
    'oscar.apps.search.apps.SearchConfig',
    'oscar.apps.voucher.apps.VoucherConfig',
    'oscar.apps.wishlists.apps.WishlistsConfig',
    'oscar.apps.dashboard.apps.DashboardConfig',
    'oscar.apps.dashboard.reports.apps.ReportsDashboardConfig',
    'oscar.apps.dashboard.users.apps.UsersDashboardConfig',
    'oscar.apps.dashboard.orders.apps.OrdersDashboardConfig',
    'oscar.apps.dashboard.catalogue.apps.CatalogueDashboardConfig',
    'oscar.apps.dashboard.offers.apps.OffersDashboardConfig',
    'oscar.apps.dashboard.partners.apps.PartnersDashboardConfig',
    'oscar.apps.dashboard.pages.apps.PagesDashboardConfig',
    'oscar.apps.dashboard.ranges.apps.RangesDashboardConfig',
    'oscar.apps.dashboard.reviews.apps.ReviewsDashboardConfig',
    'oscar.apps.dashboard.vouchers.apps.VouchersDashboardConfig',
    'oscar.apps.dashboard.communications.apps.CommunicationsDashboardConfig',
    'oscar.apps.dashboard.shipping.apps.ShippingDashboardConfig',
    'oscarapi'
```

3. Add following list in `THIRD_PARTY_APPS` section.

```console
    'widget_tweaks',
    'haystack',
    'treebeard',
    'sorl.thumbnail',
    'django_tables2',
```

4. Now add Oscar’s context processors to the template settings, listed below in `TEMPLATES/OPTIONS/context_processors`.

```console
    'oscar.apps.search.context_processors.search_form',
    'oscar.apps.checkout.context_processors.checkout',
    'oscar.apps.communication.notifications.context_processors.notifications',
    'oscar.core.context_processors.metadata',
```

5. Next, add `oscar.apps.basket.middleware.BasketMiddleware` and `django.contrib.flatpages.middleware.FlatpageFallbackMiddleware` to your ` MIDDLEWARE` setting.

```console

'oscar.apps.basket.middleware.BasketMiddleware',
'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',

```

6. Set your authentication backends to `AUTHENTICATION_BACKENDS`.

```console

'oscar.apps.customer.auth_backends.EmailBackend',
'django.contrib.auth.backends.ModelBackend',

```

7. Add following in the end of settings.py file

```
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
    },
}

```

8. To enable the Admin API, you must first set `OSCARAPI_BLOCK_ADMIN_API_ACCESS` to False in your settings.py file.

9. To make an anonymous checkout, make sure that `OSCAR_ALLOW_ANON_CHECKOUT` is set to True in your settings.py. 

10. Oscar API ships with a registration endpoint to create new accounts. The endpoint can be enabled by setting the `OSCARAPI_ENABLE_REGISTRATION` to True in settings.py.


## Project dependencies

-  Django Oscar API

```console

pip install django-oscar django-oscar-api sorl-thumbnail
export SECRET_KEY='YOUR DJANGO SECRETKEY'
python manage.py migrate
python manage.py runserver 192.168.1.11:8000

```

## Django Oscar API urls Stack
Here is the default Django Oscar API urls Stack. Since some urls have specific permissions, you might not be able to access
them all.

```console
{
    "register": "http://127.0.0.1:8000/modules/ecommerce/api/register/",
    "login": "http://127.0.0.1:8000/modules/ecommerce/api/login/",
    "basket": "http://127.0.0.1:8000/modules/ecommerce/api/basket/",
    "basket-add-product": "http://127.0.0.1:8000/modules/ecommerce/api/basket/add-product/",
    "basket-add-voucher": "http://127.0.0.1:8000/modules/ecommerce/api/basket/add-voucher/",
    "basket-shipping-methods": "http://127.0.0.1:8000/modules/ecommerce/api/basket/shipping-methods/",
    "baskets": "http://127.0.0.1:8000/modules/ecommerce/api/baskets/",
    "categories": "http://127.0.0.1:8000/modules/ecommerce/api/categories/",
    "checkout": "http://127.0.0.1:8000/modules/ecommerce/api/checkout/",
    "orders": "http://127.0.0.1:8000/modules/ecommerce/api/orders/",
    "options": "http://127.0.0.1:8000/modules/ecommerce/api/options/",
    "products": "http://127.0.0.1:8000/modules/ecommerce/api/products/",
    "countries": "http://127.0.0.1:8000/modules/ecommerce/api/countries/",
    "useraddresses": "http://127.0.0.1:8000/modules/ecommerce/api/useraddresses/",
}
```

**Admin API** is also available and exposed. Some usecases for the Admin API are:
* Creating your own admin frontend application and use Oscar as the backend (managing your catalogue, partners etc)
* Use Oscar with the Admin API as a SAAS solution: let other developers and companies integrate Oscar with their products
* Push synchronization of stockrecords / products / categories / partners instead of import scripts etc.

To enable the Admin API, you must first set `OSCARAPI_BLOCK_ADMIN_API_ACCESS` to False in your settings file.
By enabling Admin API you will have some admin Django Oscar API urls.

```console
"admin": {
        "productclasses": "http://127.0.0.1:8000/modules/ecommerce/api/admin/productclasses/",
        "products": "http://127.0.0.1:8000/modules/ecommerce/api/admin/products/",
        "categories": "http://127.0.0.1:8000/modules/ecommerce/api/admin/categories/",
        "orders": "http://127.0.0.1:8000/modules/ecommerce/api/admin/orders/",
        "partners": "http://127.0.0.1:8000/modules/ecommerce/api/admin/partners/",
        "users": "http://127.0.0.1:8000/modules/ecommerce/api/admin/users/"
    }
```


## Api Table
Here is list of Django Oscar API endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/ecommerce/api/register/`| object `{ email: "", password1: "", password2: ""}` |Oscar API ships with a registration endpoint to create new accounts. The endpoint can be enabled using the `OSCARAPI_ENABLE_REGISTRATION` setting.|
| `/modules/ecommerce/api/login/` | object `{username: "", password: ""}` |Takes object containing amount, cus_id and returns an array containing history of all the payments done by the users. |
| `/modules/ecommerce/api/basket/` | -No params- |The basket api retrieves a user's basket, which essentially ais a collection of products that hopefully end up being ordered. |
| `/modules/ecommerce/api/basket/add-product/` | object `{url: "", quantity: ""}` | The basket-add-product api adds a certain quantity of a product to the basket. It takes `url` of the product and `quantity` needs to be added. |
| `/modules/ecommerce/api/basket/add-voucher/` | object `{vouchercode: ""}` | The basket-add-voucher api adds a voucher to the basket. It takes `vouchercode` for the product needs to be added in basket. |
| `/modules/ecommerce/api/basket/shipping-methods/` | -No params- | The basket-shipping-methods api retrieves shipping methods available to the user or basket. |
| `/modules/ecommerce/api/baskets/` | -No params- | The baskets api retrieves all baskets that belong to the current (authenticated) user. |
| `/modules/ecommerce/api/categories/` | -No params- | The categories api retrieves all categories that belong to available products. |
| `/modules/ecommerce/api/checkout/` | `basket, shipping_address, [total, shipping_method_code, shipping_charge, billing_address]` | Prepare an order for checkout. |
| `modules/ecommerce/api/orders/` | -No params- | The orders api retrieves all orders that have been successfully checkout. |
| `modules/ecommerce/api/options/` | -No params- | The options api retrieves list of options set for products. |
| `modules/ecommerce/api/products/` | -No params- | The products api retrieves list of all available products. |
| `modules/ecommerce/api/countries/` | -No params- | The countries api retrieves list of all available countries. |
| `modules/ecommerce/api/useraddresses/` | -No params- | The useraddresses api retrieves list of all available user addresses. These address can be used as billing address or shipping address for the user.|
| `modules/ecommerce/api/admin/partners/` | -No params- | The partners api retrieves list of all available partners. A partner can be an individual or company who can fulfil products. E.g. for physical goods, somebody with a warehouse and means of delivery.|
| `modules/ecommerce/api/admin/users/` | -No params- | The users api retrieves list of all users, either frontend or admin users.|
| `modules/ecommerce/api/admin/productclasses/` | -No params- | The productclasses api retrieves list of all classes available for products.|
