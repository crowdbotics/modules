

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


# Android
AndroidManifest.xml
<application>
...
<meta-data
        android:name="com.google.android.gms.wallet.api.enabled"
        android:value="true" />
...
</application>


app/build.gradle

dependencies {
    ....
    
    implementation 'com.stripe:stripe-android:18.2.0'

}


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

configure your local options like this

```
export const localOptions = {
  merchantName: "Example Inc.",
  enableGooglePay: true,
  enableApplePay: true,
  merchantIdentifier: "merchant.com.crowdbotics.inaday",
  merchantCountryCode: "US",
  merchantCurrency: "USD",
  stripeTestEnv: true,
  stripePublishKey: "pk_test_xxxxxxxxxx"
};
```

2. in modules/payments/api.js

Update the token to make the api call with Authorization
```
const token = "Token 676364403988909cde7f501aa2efeaf9ca30d18c";
```
# Server

python manage.py runserver 192.168.100.7:8000

here ip is local ip (can get it from ifconfig of your network settings)