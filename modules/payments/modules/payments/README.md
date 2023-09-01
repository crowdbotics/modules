# Payments React native specs

## Module description

This is a react native based module which allows user to do payments using stripe, google pay and apple pay.

- Pay through stripe
- Pay through google pay
- Pay through apple pay

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/24f43bc0-46f3-475d-b4ad-52b19a525dd2)

## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [ ] This module requires manual iOS setup.

## ## 3rd party setup

Create `Stripe` developer account:

- Sign up for Stripe at https://dashboard.stripe.com/register.
- After successful sign up, on the dashboard click `Home` tab.
- Copy the stripe `Secrete Key` and `Publish Key` for later use.
  ![stripe](https://user-images.githubusercontent.com/76822297/227866954-e3fd72a4-e8c5-46e2-84d8-d0e59bc91a5c.png)

## Dependencies

Dependencies used:
- @stripe/stripe-react-native - https://www.npmjs.com/package/@stripe/stripe-react-native

## ## Module Options

### Global Configs

In `options/options.js`

configue your server endpoints like this

export const globalOptions = {
  ....
  url: "http://192.168.100.7:8000",
  api: "http://192.168.100.7:8000/api/v1",
  stripe_secret_key: "sk_test_xxxxxxxx"
}


### Local Configs

1. in modules/payments/options.js

configure your options like this

```js
const STRIPE_SECRET_KEY = "sk_test_xxxxxxxxxxx";
const MERCHANT_NAME = "Example Inc.";
const ENABLE_GOOGLE_PAY = true;
const ENABLE_APPLE_PAY = true;
const MERCHANT_IDENTIFIER = "merchant.com.crowdbotics.inaday";
const MERCHANT_COUNTRY_CODE = "US";
const MERCHANT_CURRENCY = "USD";
const STRIPE_TEST_ENV = true;
const STRIPE_PUBLISH_KEY = "pk_test_xxxxxxxxxx";
```

2. in `modules/payments/api.js`

Update the token to make the api call with Authorization

```js
const token = "Token ****************************";
```

### Android setup

`AndroidManifest.xml`

```xml
<application>
<meta-data
        android:name="com.google.android.gms.wallet.api.enabled"
        android:value="true" />
</application>
```

app/build.gradle

```powershell
dependencies { 
    implementation 'com.stripe:stripe-android:18.2.0'
}
```
### iOS setup

No iOS setup required.
