

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

## Update api url in options/options.js
in options/options.js

configue your server endpoints like this

export const globalOptions = {
  ....
  url: "http://192.168.100.7:8000",
  api: "http://192.168.100.7:8000/api/v1",
  stripeSecretKey: "sk_test_xxxxxxxx"
}

# Local configs

## Update token in modules/payments/api.js
Update your django authorization token to make authorized api calls.
```
const token = "Token c47e419eb3....";
```

## Update stripePublishKey in modules/payments/options.js
Update your stripePublishKey.
```
export const localOptions = {
  ...
  stripePublishKey: "pk_test_xxxxxxxxxxxx"
};
```

# Server

python manage.py runserver 192.168.100.7:8000

here ip is local ip (can get it from ifconfig of your network settings)

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Payments from "@modules/payments";

const { title, navigator } = Payments;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Payments = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Payments />
```

## Known Errors

1. You might run into an error mentioned below: 
```
What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckAarMetadataWorkAction
The minCompileSdk (31) specified in a
dependency's AAR metadata (META-INF/com/android/build/gradle/aar-metadata.properties)
is greater than this module's compileSdkVersion (android-30).

```

** Solution **: Set both compileSdkVersion and targetSdkVersion to 31 in your android/app/build.gradle file.

```
buildscript {
    ext {
        ...
        compileSdkVersion = 31
        targetSdkVersion = 31
        ...
    }
    ...
}
```
