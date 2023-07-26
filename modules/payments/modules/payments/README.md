# iOS
making sure the minimal iOS platform is set to 11 in `ios/Podfile` file

if you see this error
Undefined symbols for architecture x86_64 on iOS
While building your iOS project, you may see a Undefined symbols for architecture x86_64 error. This is caused by react-native init template configuration that is not fully compatible with Swift 5.1.

Undefined symbols for architecture x86_64:
  "(extension in Foundation):__C.NSScanner.scanUpToString(Swift.String) -> Swift.String?", referenced from:
      static Stripe.STPPhoneNumberValidator.formattedRedactedPhoneNumber(for: Swift.String, forCountryCode: Swift.String?) -> Swift.String in libStripe.a(STPPhoneNumberValidator.o)
  "__swift_FORCE_LOAD_$_swiftUniformTypeIdentifiers", referenced from:
      __swift_FORCE_LOAD_$_swiftUniformTypeIdentifiers_$_Stripe in libStripe.a(PKPaymentAuthorizationViewController+Stripe_Blocks.o)
Follow these steps to resolve this:

### Solution
Open your project via Xcode, go to project -> build settings, find library search paths and remove all swift related entries such as: $(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME) and $(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME).
Create a new Swift file to the project (File > New > File > Swift), give it any name (e.g. Fix.swift) and create a bridging header when prompted by Xcode.

### For new Scaffold `0.71.7`

Support for react-native version 0.71 was released in stripe sdk `v0.23.3` and above. That requires`Xcode 14.1` or later and is compatible with apps targeting iOS 13 or above. So you need to change the minimum iOS version supported to `13.0`

# Android
AndroidManifest.xml

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

### For new Scaffold `0.71.7`

If you get this error

```powershell
Execution failed for task ':stripe_stripe-react-native:compileDebugKotlin'.
```

You must specify the `Kotlin` version in “android/build.gradle” to `1.8.0`

# Global configs
in options/options.js

configue your server endpoints like this

export const globalOptions = {
  ....
  url: "http://192.168.100.7:8000",
  api: "http://192.168.100.7:8000/api/v1",
  stripe_secret_key: "sk_test_xxxxxxxx"
}

# Local configs
1. in modules/payments/options.js

configure your options like this

```
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

2. in modules/payments/api.js

Update the token to make the api call with Authorization
```
const token = "Token ****************************";
```
# Server

python manage.py runserver 192.168.100.7:8000

here ip is local ip (can get it from ifconfig of your network settings)