


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