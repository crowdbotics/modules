## Django Payments backend configuration and information

## Module description

Django payments module allow user to pay through the stripe payment. It helps user to accept payments and send payouts globally. Module Creates PaymentIntent that encapsulates details about the transaction, such as the supported payment methods. Creates and stores stripe profile for each stripe user. 

The following are the scope features of this module:

- Save payment details
- Creates stripe user details
- Get Payments history
- Get Payments methods
- Create payment intent sheet

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
STRIPE_SECRET_KEY='sk_test_xxxxxxx'
CONNECTED_STRIPE_ACCOUNT_ID='acct_xxxxx'
```


## 3rd party setup

Create `Stripe` developer account:

- Sign up for Stripe at https://dashboard.stripe.com/register.
- After successful sign up, on the dashboard click `Home` tab.
- Copy the stripe `Secrete Key` and `Publish Key` for later use.
  ![stripe](https://user-images.githubusercontent.com/76822297/227866954-e3fd72a4-e8c5-46e2-84d8-d0e59bc91a5c.png)

## Dependencies

[Stripe](https://github.com/stripe/stripe-python/blob/master/README.md)

Dependencies used:

- [stripe==2.60.0](https://pypi.org/project/stripe/)


## API details

| Api Name                       |           Param           | Description                                                                                                           |
| ------------------------------ |:-------------------------:|:----------------------------------------------------------------------------------------------------------------------|
| `/modules/payments/get_payments_history/`|        -No Params-        | Returns of all the payments done by the users.                                                                        |
| `/modules/payments/create_payment_intent_sheet/`| object `{amount, cus_id}` | Takes object containing amount, cus_id and returns an array containing history of all the payments done by the users. |
| `/modules/payments/get_payments_methods/`|        -No Params-        | Returns an array containing the avaliable payments methods done by the users.                                         |

### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1dYIXsSBkNeicBd30648KukkU58tH_kSloPf2vf9x1nM/edit?usp=sharing), which provides more information about the module's actual intentions.

