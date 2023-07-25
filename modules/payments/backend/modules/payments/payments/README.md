# Django Payments
Django payments module allow user to pay through the stripe payment. It helps user to accept payments and send payouts globally. Module Creates PaymentIntent that encapsulates details about the transaction, such as the supported payment methods. Creates and stores stripe profile for each stripe user. 

## Features
1. Save payment details
2. Creates stripe user details

## Required Dependencies/Packages
* **stripe**

The Stripe is a python package to use Stripe REST API .
Install it by running the command:
```console
pip install stripe==2.60.0
```

## Setting up a Stripe Account
1. Sign up for Stripe at https://dashboard.stripe.com/register.
2. After successful sign up, on the dashboard click `Home` tab.
3. Copy the stripe `Secrete Key` and `Publish Key` for later use. 

![stripe](https://user-images.githubusercontent.com/76822297/227866954-e3fd72a4-e8c5-46e2-84d8-d0e59bc91a5c.png)

## Installations

1. Make migrations
```
python manage.py makemigrations
```
pip install sendgrid

2. Run migrations
```
python manage.py migrate
```

3. Run the server
```
python manage.py runserver
```

## Configurations Keys
Keep your stripe secrete key in `.env` file.
```console
STRIPE_SECRET_KEY='sk_test_xxxxxxx'
```


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/payments/get_payments_history/`| -No Params-  | Returns of all the payments done by the users. |
| `/modules/payments/payment_sheet/`|  object `{amount, cus_id}`  |Takes object containing amount, cus_id and returns an array containing history of all the payments done by the users.             |


### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1dYIXsSBkNeicBd30648KukkU58tH_kSloPf2vf9x1nM/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)