### App Registration

First, you will need to register your application with Microsoft Azure Portal. This will give you an Application ID for your application, as well as enable it to receive tokens.

1. Sign in to the [Microsoft Azure Portal](https://portal.azure.com).
2. First you need to find the **App Registration Service**. You could just type in the service name in the search bar on the middle top of the window and select it or do like following:
   1. Click on **All services** in the left panel
   2. Then select from the shown in bold categories the **Identity**
   3. Click on the star sign near the _App registration_ service name to add it to favorites
   4. Now you can easily access the service using the left portal panel
3. After selecting _App registration_ service click **New registration**
4. Enter a friendly name for the application
5. Select account type that should be supported by your app. The default choice _"Accounts in any organizational directory and personal Microsoft accounts"_ is the widest one.
6. Now you need to add **Redirect URI**
   1. Select _Public client (mobile & desktop)_ from dropdown
   2. Type in the URI. See the URI format in the section below.
7. Click **Register** to create the app registration record.
8. Find the _Application (client) ID_ value in **Overview** section, copy and save the value in a safe location.
9. You don't need to set _API Permissions_. It is meant for admin consent only.
10. Now select **Authentication** from the left menu
11. lick **Save** button above to save changes.
12. Select **Manifest** from the left menu. A Json type file will be opened.
    1. Find 
    ```json
    "oauth2AllowIdTokenImplicitFlow": false,
    "oauth2AllowImplicitFlow": false
    ```
    2. Set both properties to `true`.
    3. Click `Save` button.

#### Callback URL(s)

Callback URLs are the URIs that Azure AD invokes after the authentication process. Azure routes your application back to this URI and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your apps's registered **Redirect-URIs**. This will enable Azure to recognize these URLs as valid. If omitted, authentication will not be successful.

##### iOS - default redirect URI structure

```text
{YOUR_BUNDLE_IDENTIFIER}://{YOUR_BUNDLE_IDENTIFIER}/ios/callback
```

##### Android - default redirect URI structure

```text
{YOUR_APP_PACKAGE_NAME}://{YOUR_APP_PACKAGE_NAME}/android/callback
```

**Note 1:** Make sure to replace {YOUR_BUNDLE_IDENTIFIER} and {YOUR_APP_PACKAGE_NAME} with the actual values for your application.

**Note 2:** Be aware of allowed characters for the scheme part of URI. According to RFC 2396 (Section 3.1):

```text
scheme = alpha *( alpha | digit | "+" | "-" | "." )
```

As you can see, allowed in identifier and package name underscore (`_`) character is NOT allowed in the URI scheme!

### App Configuration

#### Android config

In the file `android/app/src/main/AndroidManifest.xml` you must make sure the **MainActivity** of the app has a **launchMode** value of `singleTask` and that it has the following intent filter:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:pathPrefix="/${applicationId}/android/callback"
        android:scheme="${applicationId}" />
</intent-filter>
```

The `applicationId` here should be the same as your app package name, and not the ID from MS App Portal.

You would have the following **MainActivity**  configuration:

```xml
<activity
android:name=".MainActivity"
android:label="@string/app_name"
android:launchMode="singleTask"
android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
android:windowSoftInputMode="adjustResize">
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:pathPrefix="/android/callback"
        android:host="${applicationId}"
        android:scheme="${applicationId}" />
</intent-filter>
</activity>
```

> For more info please read [react native docs](https://facebook.github.io/react-native/docs/linking.html)
#### iOS config

Inside the `ios` folder find the file `AppDelegate.[swift|m]` add the following to it

```objc
// iOS 9.x or newer
#import <React/RCTLinkingManager.h>
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

If you're targeting iOS 8.x or older, you can use the following code instead:

```objc
// iOS 8.x or older
#import <React/RCTLinkingManager.h>
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`, e.g.

```xml
<key>CFBundleIdentifier</key>
<string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
```

> The value `org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)` is the default for apps created with React Native CLI, you may have a different value.
>
> It is advisable to replace it with your own meaningfull ID in reverse DNS format. e.g. _com.my-domain.native-app_
and then register a URL type entry using the value of `CFBundleIdentifier` as the value of `CFBundleURLSchemes`

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>AzureAuth</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.my-domain.native-app</string>
        </array>
    </dict>
</array>
```

>**Attention:** The `<string>` value for `CFBundleURLSchemes` key MUST be the literal value of the Bundle Identifier with NO $-variables. In the example above the string `com.my-domain.native-app` represents _your_ Bundle Identifier.
For more info please read [react native docs](https://facebook.github.io/react-native/docs/linking.html)

## Usage

```js
import AzureAuth from 'react-native-azure-auth';
const azureAuth = new AzureAuth({
    clientId: 'YOUR_CLIENT_ID'
});
```

### Authorization with user interaction

```js
    try {
      let tokens = await azureAuth.webAuth.authorize({scope: 'openid profile User.Read Mail.Read' })
      this.setState({ accessToken: tokens.accessToken });
      let info = await azureAuth.auth.msGraphRequest({token: tokens.accessToken, path: '/me'})
      this.setState({ user: info.displayName, userId: tokens.userId })
    } catch (error) {
      console.log(error)
    }
```

### Silent authorization

```js
    try {
        // Try to get cached token or refresh an expired ones
        let tokens = await azureAuth.auth.acquireTokenSilent({scope: 'Mail.Read', userId: this.state.userId})
        if (!tokens) {
            // No cached tokens or the requested scope defines new not yet consented permissions
            // Open a window for user interaction
            tokens = await azureAuth.webAuth.authorize({scope: 'Mail.Read'})
        }
        let mails = await azureAuth.auth.msGraphRequest({token: tokens.accessToken, path: '/me/mailFolders/Inbox/messages'})
    } catch (error) {
      console.log(error)
    }
```

### Usage example

You can consult a tiny sample project [react-native-azure-auth-sample](https://github.com/vmurin/react-native-azure-auth-sample) for usage example
