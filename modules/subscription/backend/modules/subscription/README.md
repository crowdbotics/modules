# Stripe
pip install stripe==2.60.0
export DEBUG=1
export STRIPE_SECRET_KEY='sk_test_xxxxxxx'
export SECRET_KEY='YOUR DJANGO SECRETKEY'
export STRIPE_WEBHOOK_SECRET = 'whsec_xxxxxxx'
python manage.py migrate
python manage.py runserver 192.168.1.11:8000
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
