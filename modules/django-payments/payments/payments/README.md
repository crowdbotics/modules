


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


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/payments/get_payments_history/`| -No Params-  | Returns of all the payments done by the users. |
| `/modules/payments/payment_sheet/`|  object `{amount, cus_id}`  |Takes object containing amount, cus_id and returns an array containing history of all the payments done by the users.             |
