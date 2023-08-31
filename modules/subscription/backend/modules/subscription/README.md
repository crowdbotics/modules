## Subscription Module backend configuration and information

## Module description

The module that will be used by users to select subscription plan and price, and click on the subscribe.

The following are the scope features of this module:

- Ability to create the subscription plans (Free, Monthly, Annual)
- Ability to get the details of subscription plans
- Ability to cancel the subscribed plans

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
STRIPE_SECRET_KEY='sk_test_xxxxxxx'
SECRET_KEY='YOUR DJANGO SECRETKEY'
STRIPE_WEBHOOK_SECRET='whsec_xxxxxxx'
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

| Api Name                                          |                    Param                    | Description                                                                                                                   |
|---------------------------------------------------|:-------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------|
| `/modules/subscription/buy_subscription_plan/`    |         body_params  `'price_tier'`         | Takes `price_tier` which is price id from the selected plan. Buys that selected plan against `price_tier`.                    |
| `/modules/subscription/get_subscription_plans/`   |                      -                      | Returns the collection/list of all the `subscription_plans` that can be subscribed by a user.                                 |
| `/modules/subscription/cancel_subscription_plan/` |            body_params `sub_id`             | Takes subscription id `sub_id`  of subscription plan is to be cancelled. Deletes the  subscription plan against the `sub_id`. |

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1jO5jWPBdzSTSoE2ZL3anqg9NK7s_Ph-cXefd-bOBLOg/edit?usp=sharing),
which provides more information about the module's actual intentions.