

# Payment Module 

Payment module supports following functionalities

- Stripe Payment
- Apple Pay (through stripe)
- Google Pay (through stripe)
- [Apple In-App Purchase (through apple)](#headin)

# Setup iOS
Follow following steps to setup the project in iOS.

- NOTE: Before doing` pod install`
- open `ios/Podfile` file and set `platform :ios, '11.0'` if its 10 or less than 11.
- Then do `pod install`
- open the `ios/PROJECT_NAME.xcworkspace` file in Xcode.
- Create a new Swift file to the project `File > New > File > Swift File`, give it any name (e.g. Fix.swift) and create a `bridging header` when prompted by Xcode.
- select the project and click on `build settings` search for `Library Search Paths` double click values and remove all swift related entries such as: \$(TOOLCHAIN_DIR)/usr/lib/swift/\$(PLATFORM_NAME) and \$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/\$(PLATFORM_NAME)


### **Setup Apple In-App Purchase Local testing environment**

- Create a new file to the project `File > New > File > StoreKit Configuration File`, give it a name (e.g. Configuration).
- you will see a UI to add products click + icon and choose from options
  - [Add consumable In-App Purchase](https://developer.apple.com/in-app-purchase/#:~:text=Offer%20extra%20content%20and%20features,directly%20on%20the%20App%20Store.)
  - [Add Non-Consumable In-App Purchase](https://developer.apple.com/in-app-purchase/#:~:text=Offer%20extra%20content%20and%20features,directly%20on%20the%20App%20Store.)
  - [Add Non-Renewing Subscription](https://developer.apple.com/in-app-purchase/#:~:text=Offer%20extra%20content%20and%20features,directly%20on%20the%20App%20Store.)
  - [Add Auto-Renewable Subscription](https://developer.apple.com/in-app-purchase/#:~:text=Offer%20extra%20content%20and%20features,directly%20on%20the%20App%20Store.)
- goto `Product > Scheme > Edit Scheme` in **StoreKit Configuration dropdown** select the Configuration file you created.

*(not required step)* You can see sample product configurations in the provided file `ios/Configuration.storekit.sample` copy all the data from this file to your created configuration file if you dont want to create your own products.
   
### **Setup apple In-App Purchases backend<a name="headin"></a>**
- visit **http://127.0.0.1:8000/admin/payments/appleiapproduct/**
- Add new Record with 
  - **`name`** (any name)
  - **`Product id`** (e.g. com.temporary.id) this product id for testing would be from storeKit configuration but on PROD/testflight it will come from appstoreconnect dashboard

### Where to give access when user subscribe / upgrade / downgrade
- look for class `class AppleIAPayment` in `success` block we have to give relevent access to that user. that may be a new user type of adding group or permissions to a user or whatever the project requires.



# Setup Android


in `android/app/src/main/AndroidManifest.xml` file add following
```
<application> 
    ...
    <meta-data android:name="com.google.android.gms.wallet.api.enabled"
            android:value="true" />
    ...
</application>
```

in `android/app/build.gradle` file add following
```
dependencies {
  ....

  implementation 'com.stripe:stripe-android:18.2.0'

}

defaultConfig {
  ....

  missingDimensionStrategy 'store', 'play'

}

dexOptions {
    javaMaxHeapSize "4G"
}
```
in `android/build.gradle` change following
```
ext {
    buildToolsVersion = "30.0.3"
    minSdkVersion = 21
    compileSdkVersion = 30
    targetSdkVersion = 30
    ndkVersion = "20.1.5948944"
}
```
in `android/gradle.properties` add
```
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

```




# Global configs
in options/options.js

configue your server endpoints like this
```
export const globalOptions = {
  ....
  url: "http://192.168.100.7:8000",
  api: "http://192.168.100.7:8000/api/v1",
  stripe_secret_key: "sk_test_xxxxxxxx"
}
```

### Server connection with you simulator or device

```console
foo@bar:~$ python manage.py runserver 192.168.100.7:8000
```
here `ip (192.168.100.7)` is local ip (can get it by running `ifconfig` in terminal or from your network settings)
and make sure your device and computer are on same network.