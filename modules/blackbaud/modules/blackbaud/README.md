# Blackbaud SKY React native specs

## Module description

This is a react native based module which allows users to authorize their blackbaud accounts with your app and get access to open, industry-standard REST APIs for Blackbaud solutions.

- Ability to authorize the user for access token.
- Ability to retrieve the access token
- Ability to retrieve the list of events.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/6bdfddb0-cdfd-4496-8d44-ec677cc53cb4)

## ## Features

 - [X] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [ ] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [x] This module requires manual iOS setup.

## ## 3rd party setup

In order to configure the module, the first thing you need to do is to create an app on Blackbaud. Here's the steps detailing that process:
1. Sign up for a Blackbaud Developer account.
2. Go to `settings`, from My applications, select Add.
3. Provide the details about your application, including the name, details, organization name, publisher name, logo, and website. This information appears to Blackbaud customer admins when they connect your application, as well as to users during the authorization process.
4. Select Save. After this your `BLACKBAUD_CLIENT_ID` and `BLACKBAUD_CLIENT_SECRET` will appear.
5. To generate a subscription key, go to  "My subscriptions".
6. For each subscription if you have, you can select to generate your primary or secondary access key.
7. After that your `Bb-Api-Subscription-Key` will appear.

## Dependencies

Dependencies used:

- react-native-app-auth - https://www.npmjs.com/package/react-native-app-auth

## ## Module Options

### Global Configs

Update the `options/options.js` file with your app's backend url.
```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

In **modules/blackbaud/options.js** update `redirectUrl`, `client_id`, with your blackbaud's developer account app's redirectUrl and client_id.

### Android setup


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

### iOS setup

Add following lines in your `info.plist`

```xml
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

```c
#import "RNAppAuthAuthorizationFlowManager.h"
#import <React/RCTLinkingManager.h>
```

Then, Replace this line

```diff
- @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
+ @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, RNAppAuthAuthorizationFlowManager>

```

Also add this property before `@end`

```c
 @property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;
```

At last, add these line in `AppDelegate.m`

```c
 - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *, id> *) options {
  if ([self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url]) {
    return YES;
  }
  return [RCTLinkingManager application:app openURL:url options:options];
 }
```
