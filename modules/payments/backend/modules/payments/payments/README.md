


# Dependencies

-  Stripe
```console
pip install stripe==2.60.0
export DEBUG=1
export STRIPE_SECRET_KEY='sk_test_xxxxxxx'
export SECRET_KEY='YOUR DJANGO SECRETKEY'
python manage.py migrate
python manage.py runserver 192.168.1.11:8000
```

Get this IP from 
```console
ifconfig
```
OR from your network settings this is your local IP of computer.


Add the IP above e.g. `192.168.1.11:8000` to `options/options.js` for mobile to connect to your local server

- Stripe connect
To use stripe connect, Enable "Is wallet connect" and add "Application fee" in "stripe settings" from admin panel.
Pass "connected_stripe_account_id" and "application_fee_amount" params to create_payment_intent_sheet method.  