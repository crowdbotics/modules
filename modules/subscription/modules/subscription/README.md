# Subscriptions Module
Allow subscriptions (one time, recurring)
Allow subscriptions through in-App subscriptions for iOS

## Features
1. Ability to create the subscription plans (Free, Monthly, Annual)
2. Ability to get the details of subscription plans
3. Ability to cancel the subscribed plans 

## Setting up a Stripe Account
1. Sign up for Stripe at https://dashboard.stripe.com/register.
2. After successful sign up, on the dashboard click `Home` tab.
3. Copy the stripe `Secrete Key` and `Publish Key` for later use.
![stripe](https://user-images.githubusercontent.com/76822297/227866954-e3fd72a4-e8c5-46e2-84d8-d0e59bc91a5c.png)

## Dependency -> Payment Module

NOTE: If it's an extension of the existing module then in that case all the existing functionality should work as it is.

## API Calling Methods
All the api calling methods reside in `api.js` file.

* **CreateSubscriptionRequest**
`fetchPaymentSheetParams` method takes `price_tier` which is price id from the selected plan. Buys that selected plan against `price_tier`. Returns  paymentIntent, ephemeralKey, customer details.

* **GetSubscriptionRequest**
`fetchPlans` method used to get the details of subscription plans.

* **CancelSubscriptionRequest**
`cancelPlan` method used to cancel the subscribed plans.
## Global configs

### Update api url in options/options.js
in options/options.js

configue your server endpoints like this

export const globalOptions = {
  ....
  url: "http://192.168.100.7:8000",
  api: "http://192.168.100.7:8000/api/v1",
  stripeSecretKey: "sk_test_xxxxxxxx"
}

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Subscription from "@modules/subscription";
const { title, hook } = Subscription;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.
```javascript
import { modules } from '@modules';
const Subscription = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Subscription/>
```
## Local configs

### Update token in modules/payments/api.js
Update your django authorization token to make authorized api calls.
```
const token = "Token c47e419eb3....";
```

### Update local options in modules/payments/options.js
```
export const localOptions = {
  merchantName: "Example Inc.",
  enableGooglePay: true,
  enableApplePay: true,
  merchantIdentifier: "",
  merchantCountryCode: "US",
  merchantCurrency: "USD",
  stripeTestEnv: true,
  stripePublishKey: "pk_test_xxxxxxxxxxxx"
};
```
## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1jO5jWPBdzSTSoE2ZL3anqg9NK7s_Ph-cXefd-bOBLOg/edit?usp=sharing), which provides more information about the module's actual intentions.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)