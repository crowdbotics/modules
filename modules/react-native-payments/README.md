# Payment Module
Payments module allow user to pay through the stripe payment. It helps user to accept payments and send payouts globally. Lists user's payment history. 

## Features
1. Get payment history list
2. Pay using credit/debit card.


## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` section and past them in your project's main `package.json` file, and run this command.
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api.js` file.

* **fetchPaymentSheetParams**
`fetchPaymentSheetParams` method takes `amount` creates a stripe `paymentIntentSheet` to start the process of payment,.

* **fetchPaymentHistory**
`fetchPaymentHistory` fetches user's stripe payment history from database.



## Module Configurations
### iOS
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


### Android
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

## Setting up a Stripe Account
1. Sign up for Stripe at https://dashboard.stripe.com/register.
2. After successful sign up, on the dashboard click `Home` tab.
3. Copy the stripe `Secrete Key` and `Publish Key` for later use. 

![stripe](https://user-images.githubusercontent.com/76822297/227875225-01312368-b637-43bf-affd-2a74e9c7ef2e.png)


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

### Update stripePublishKey in modules/payments/options.js
Update your stripePublishKey.
```
export const localOptions = {
  ...
  stripePublishKey: "pk_test_xxxxxxxxxxxx"
};
```


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

**Solution**: Set both compileSdkVersion and targetSdkVersion to 31 in your android/build.gradle file.

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


### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1dYIXsSBkNeicBd30648KukkU58tH_kSloPf2vf9x1nM/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
