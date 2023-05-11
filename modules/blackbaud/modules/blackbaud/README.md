# Blackbaud SKY

Blackbaud SKY enables your entire organization to be on one cloud software solution. Module allows user to access to open, industry-standard REST APIs for Blackbaud solutions.

# Scope Features

The following are the key features in scope for this module.

1. Ability to authorize the user for access token.
2. Ability to retrieve the access token
3. Ability to retrieve the list of events.

## Install Required Dependencies/Packages

All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:

```
"react-native-app-auth": "^6.4.3"
```

and run this command.

```
yarn install
```

## Local Configs

In **modules/blackbaud/options.js** update `redirectUrl`, `client_id`, with your blackbaud's developers account app's redirectUrl and client_id.

## Android Configurations

Add following lines in `android/app/src/main/AndroidManifest.xml`

```
 <activity android:name="net.openid.appauth.RedirectUriReceiverActivity">
          <intent-filter>
              <action android:name="android.intent.action.VIEW"/>
              <category android:name="android.intent.category.DEFAULT"/>
              <category android:name="android.intent.category.BROWSABLE"/>
              <data android:scheme="com.demo"/>
          </intent-filter>
      </activity>
```

Then, add these lines in `android/app/build.gradle` under `defaultConfig`

```
 manifestPlaceholders = [
            appAuthRedirectScheme: 'com.demo'
        ]
```

Replace `com.demo` with the package name of your app.

## IOS Configurations

Add following lines in your `info.plist`

```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.your.app.identifier</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>io.identityserver.demo</string>
    </array>
  </dict>
</array>
```

`CFBundleURLName` is any globally unique string. A common practice is to use your bundle identifier.

Add your bundle identifier instead of `CFBundleURLSchemes` & `io.identityserver.demo`

Then, add these lines on top of `AppDelegate.h`

```
#import "RNAppAuthAuthorizationFlowManager.h"
#import <React/RCTLinkingManager.h>
```

Then, Replace this line

```
- @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
+ @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, RNAppAuthAuthorizationFlowManager>

```

Also add this property before `@end`

```
 @property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;
```

At last, add these line in `AppDelegate.m`

```
 - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *, id> *) options {
  if ([self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url]) {
    return YES;
  }
  return [RCTLinkingManager application:app openURL:url options:options];
 }
```

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import BlackbaudSky from "@modules/blackbaud-sky";
const { title, hook } = BlackbaudSky;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from "@modules";
const BlackbaudSky = modules[module_index].value.navigator; //module_index : position of the module in modules folder
<BlackbaudSky />;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
