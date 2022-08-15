# Subscriptions Module

Allow subscriptions (one time, recurring)
Allow subscriptions through in-App subscriptions for iOS

## Dependency -> Payment Module

NOTE: If it's an extension of the existing module then in that case all the existing functionality should work as it is.

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
