# Subscription Module
The module that will be used by users to select subscription plan and price, and click on the subscribe.

## Features
1. Ability to create the subscription plans (Free, Monthly, Annual)
2. Ability to get the details of subscription plans
3. Ability to cancel the subscribed plans 

## Required Dependencies/Packages
* **stripe**
The Stripe is a python package to use Stripe REST API .
Install it by running the command:
```console
pip install stripe==2.60.0
```

And add this package in `pipfile`
```
stripe="2.60.0"
```
## Setting up a Stripe Account
1. Sign up for Stripe at https://dashboard.stripe.com/register.
2. After successful sign up, on the dashboard click `Home` tab.
3. Copy the stripe `Secrete Key` and `Publish Key` for later use.
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
# Stripe environment variables
export DEBUG=1
export STRIPE_SECRET_KEY='sk_test_xxxxxxx'
export SECRET_KEY='YOUR DJANGO SECRETKEY'
export STRIPE_WEBHOOK_SECRET = 'whsec_xxxxxxx'
Get this IP from

ifconfig
OR from your network settings this is your local IP of computer.

Add the IP above e.g. 192.168.1.11:8000 to options/options.js for mobile to connect to your local server

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/subscription/buy_subscription_plan/`| `price_tier`  | Takes `price_tier` which is price id from the selected plan. Buys that selected plan against `price_tier`. |
| `/modules/subscription/get_subscription_plans/`| -No Params- |Returns the collection/list of all the `subscription_plans` that can be subscribed by a user.|
| `/modules/subscription/cancel_subscription_plan/`| `sub_id` |Takes subscription id `sub_id`  of subscription plan is to be cancelled. Deletes the  subscription plan against the `sub_id`.|

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1jO5jWPBdzSTSoE2ZL3anqg9NK7s_Ph-cXefd-bOBLOg/edit?usp=sharing), which provides more information about the module's actual intentions.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)