# Social Login - Frontend Module

This is React Native code for social login feature. For this feature to be fully functional, you will need to install and configure Social Login - Backend module.

## Initial Setup

In this section, for every mention of `<module_directory>`, consider the directory name of this module installed in your app. For example, if the SocialLogin module has a folder/directory with name `SocialLogin12345`, then that's what you should use to replace `<module_directory>`.

When you are finished with the setup, do not forget to commit all changed and created files to the GitHub project, so the module can be successfully deployed on Crowdbotics platform.

#### Install dependencies and setup native files

This is a summary of the native changes required, but you can explore more details in the Facebook, Google and Apple sections at the end of this documentation.

Install the dependencies (check the list in the package.json of this directory):

```sh
yarn add @react-native-google-signin/google-signin react-native-fbsdk@1.1.2 @invertase/react-native-apple-authentication react-native-get-random-values
```

Add the plugin on `android/app/build.gradle` (at the end of the file):

```
apply plugin: 'com.google.gms.google-services'

```

Add the tag on `android/app/src/main/AndroidManifest.xml`:

```
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

On the `android/build.gradle` file:

Add the following to the `ext` section:

```
        googlePlayServicesAuthVersion = "16.0.1"
```

Add the following to the `dependencies` section:

```
        classpath ('com.google.gms:google-services:4.1.0')
```

Update the file `android/app/src/main/res/values/strings.xml` with the follow string (the value might need to be replaced later): 

```
<string name="facebook_app_id">Your_facebook_id_here</string>
```

#### Update api url

Update the file `<module_directory>/auth/services.js`, replacing the value of `baseURL` with your own app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, update from
`baseURL: "https://your-app-backend.botics.co"` to `baseURL: "https://my-app.botics.co"`

Note for developers: you can access the user token through the reducer state (i.e. `state.login.token` and user auth information like email at `state.login.user`)


#### Change the login screen destination to your desired screen/module (likely Home screen).

To do that, open the `screens/constants.js` file and edit the `HOME_SCREEN_NAME` value with the desired destination module. For example, if my home screen is called `HomeScreen1234535`, then I should change as follows: `export const HOME_SCREEN_NAME = 'HomeScreen1234535'`. If you desire, you can also update your logo image URL (be mindful that the size of the image should match the original ones for ideal results).

#### Make sure your backend support SENDGRID for emailing (optional)

If your app's backend does not have SENDGRID environmental variables available, make changes to project backend settings (in `/backend/YOUR_PROJECT_NAME/settings.py` file) like below:

```python
EMAIL_HOST = env.str("EMAIL_HOST", "smtp.sendgrid.net")
EMAIL_HOST_USER = env.str("SENDGRID_USERNAME", "")
EMAIL_HOST_PASSWORD = env.str("SENDGRID_PASSWORD", "")
```

If this code already exists, you can just skip this step.

Next, you need to configure your own sendgrid credentials. Reference website: [Sendgrid](https://wwww.sendgrid.com)
Once configured, add the sendgrid credential information to your project's environment variables.

Using the Crowdbotics Dashboard, navigate to "Settings" and select the tab "Environment Variables", here you will add the following variables:

```
SENDGRID_USERNAME
SENDGRID_PASSWORD
```


## Old Crowdbotics Scaffold (optional)
If your project does not use the latest version of Crowdbotics scaffold 1.0, you might need to consider these manual steps.
To verify if your project is on the latest version, look for a `.crowdbotics.json` file at the root of your project. If it does not exist, follow the steps below. If it already exists, you can skip to the `Configuring Facebook` section.
#### Open the `/src/navigator/mainNavigator.js` file and import the login navigator in the import section as shown:
If this module code is at the `modules/` and you are going to move this code to another place within the app, replace the filepath below `"../../modules/<module_directory>/"` with desired location:

```js
import SocialLogin from "../../modules/<module_directory>/";
```

Then, add it to the AppNavigator, as follows:

```js
const AppNavigator = {
 SocialLogin: { screen: SocialLogin.navigator },
 //@BlueprintNavigationInsertion
...
```

#### Add reducers to the store. Open `/src/store/index.js` file and add the following imports:

```js
import socialLoginSaga from "../features/<module_directory>/auth/sagas";
import socialLoginReducer from "../features/<module_directory>/auth/reducers";
```

Locate the store creation with `createStore`, add comma at end of the last reducer (possibly `customReducer`) and **ADD** below the following code `socialLogin: socialLoginReducer`.

This is how your createStore should look like after modifications:

```js
const store = createStore(
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    login: socialLoginReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);
```

Near the end, before the `export { store }` line, register the new sagas `sagaMiddleware` like this:

```js
sagaMiddleware.run(socialLoginSaga);
```

## Configuring Facebook

You need to set up Facebook SDK to get social login properly configured in your app. Ideally, these steps should be done by the project owner or with an project owner account, as it needs to be properly configured for app store release, but it can be done with debug configuration during the development phase.

Ultimately, you need to follow the [react-native-fbsdk instructions](https://github.com/facebook/react-native-fbsdk#3-configure-projects) to configure your app, but it will be provided steps in this README to accomplish this configuration for a Crowdbotics app.

1. First, access Facebook for developers at https://developers.facebook.com and register for a developer account, if you do not already have one.

2. After that, access the [your facebook apps page](https://developers.facebook.com/apps/) and choose to create a Facebook app. For the purpose of social login, you could choose the `build connected experiences` upon facing the question "What do you need your app to do?" and click continue (as shown below). In the next page, type in the name of your app, contact email and, if existing, business manager account for the app and click `Create App`:

![facebook-create-app](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/15c9063c-6f5d-4afa-a77f-76f75c15e062.png)
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/ff97ef37-8535-4f4b-958f-def310bf110d.png)

3. After creation, go to your app's dashboard and look for an option to set up a social login product to your app. The url should look like this: `https://developers.facebook.com/apps/<your_facebook_app_id>/fb-login/quickstart/`. There, choose the Android option (for your Android app) and iOS option (for your iOS app configuration).

### Android Configuration

Upon entering the `Android` page on the Facebook login configuration, you can click next/continue for most steps. But you will need to pay attention to the following steps:

- _3. Tell Us about Your Android Project_
  Here, they will ask for two things: `Package Name` and `Default Activity Class Name`. Your package name is located on `<your_project_name>/android/app/src/main/AndroidManifest.xml` file, at the first and second line of code as `<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="<your_package_name>">`. For my test app, this name is: `com.social_login_1234`.

For activity class name, just add a `.MainApplication` to your package name. For example, the tutorial application will have the follwing values:

- Package Name: com.social_login_1234
- Default Activity Class Name: com.social_login_1234.MainApplication

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/606769e1-f8ac-4712-92e9-ef92455db6ae.png)

- _4. Add Your Development and Release Key Hashes_
  At this step, you need to generate the key hash for your app. Consult the official documentation for more information on how to create a [development](https://developers.facebook.com/docs/android/getting-started/#create_hash) or [production key hash](https://developers.facebook.com/docs/android/getting-started/#release-key-hash) and insert the appropriate value for your Key Hashes and save.

- _6. Edit Your Resources and Android Manifest_
  This step will tell you which files in your project to edit. `/app/res/values/strings.xml` is equivalent to `<your_project_name>/android/app/src/main/res/values/strings.xml`

Update your Android manifest file (`/android/app/src/main/AndroidManifest.xml`) and add `<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>` code to the metadata section (if it doesn't already exists). It should look like this:

```xml
<meta-data
 android:name="com.google.android.geo.API_KEY"
 android:value="XXXXXXX"/>
 <!-- Add this line below:  -->
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>

```

After everything, open the file `<your_project_name>/android/app/build.gradle` look for `defaultConfig` object and add `multiDexEnabled true` (if you are on a React Native version older than 0.64). It will look something like this:

```js
...
   defaultConfig {
       applicationId "com.social_login_test_0_18906"
       minSdkVersion rootProject.ext.minSdkVersion
       targetSdkVersion rootProject.ext.targetSdkVersion
       versionCode 1
       versionName "1.0"
       multiDexEnabled true // <- add this here, if it doesnt already exists
   }
...
```

### iOS Configuration (Mac and access to XCode Required)

Upon entering the `Android` page on the Facebook login configuration, there will be a question `Set up your development environment before using Facebook Login for iOS.`. Answer this by picking the dropdown option for `SDK: Cocoapods`. From there, follow the provided instructions. At this step, you should basically change the file `<your_project_name>/ios/Podfile` and add `pod 'FBSDKLoginKit'` and `pod 'FBSDKCoreKit'` after the last pod command and save. It should look like this:

```pod
...
 pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

 pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
 pod 'FBSDKCoreKit' # <- Add this line HERE
 pod 'FBSDKLoginKit' # <- Add this line HERE
...
```

Then, on terminal, navigate to `<your_project_name>/ios/` folder and run:

```sh
pod install
```

Make sure that you have all the package.json dependencies installed before running the command above (consult the main README.md for the project for more information).

In the next step `2. Add your Bundle Identifier`, open your project on xcode.

> 1. Go to xcode and choose to open a project
> 2. Open the `<your-Project_name>/ios/<your_project_name>.xcworkspace` file.
> 3. Click on your project's name on the left side bar and look for `Bundle identifier`. You can update it to something like com.crowdbotics.<your_app_name>. In this tutorial, our app is named social-login-1234, so our identifier would be com.crowdbotics.social-login-1234. You can update this later.

Copy this value and paste in the Facebook configuration field for bundle ID.

Go to step `4. Configure Your Info.plist` and follow all the instructions.

Finally, open your project again on XCode, find the root folder of the XCode project, click on the right button of your mouse and select to create a `New File`. Choose it to be a `Swift` file and click create, as shown in the images below:

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/19926/da0aa8c8-1779-46d9-8a2e-5e5665d6d15d.png)

XCode will ask about Bridging Folder, just choose the option `Create Bridging Folder`.
You are all set up for iOS deployment now!

## Configuring Google Login

Similarly to Facebook, Google login should ideally be configured in the Google account that is going to manage everything related to this project (usually, the project owner). But for development purposes, it can temporarily be configured by anyone.

Before anything, open this file in your social login module `/src/features/<your_social_login_module_name>/auth/utils.js` and locate the variable `GOOGLE_WEB_CLIENT_ID` and update its value with the proper backend client id that you previously used to configure your `SocialLogin - Backend` module (Go to admin panel > Social Accounts > Social Applications, choose the Google application and copy the code in the `Client Id` field).

Ultimately, you need to follow the [react-native/google-signin instructions](https://github.com/react-native-google-signin/google-signin#project-setup-and-initialization) to configure your app, but it will be provided steps in this README to accomplish this configuration for a Crowdbotics app.

1. Configure your Google Cloud account to access the [console](https://console.developers.google.com/), and to start a quick setup of an API project, visit https://developers.google.com/identity/sign-in/android/start#configure-a-google-api-project and click on `Configure a Project`. Then follow the instructions for each application type below.

### Android Configuration

2. There, you will choose to create a new project (or use an existing one, if desired). Follow the instructions, filling out the product name, choosing `Android` as your OAuth client and filling out the form. There are two values to fill out here: One is your `Package Name` which can be found in your AndroidManifest, as described in the Facebook step; the other is `SHA-1 signing certificate`: to get a debug/development key store, type on your app console:

```
keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Read the [documentation](https://support.google.com/googleapi/answer/6158849?hl=en#installedapplications&android) for more information.

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/2b572e69-9c1d-4fd4-abc0-25a33c6d5ff1.png)

Finish up and `Download Client Configuration` (you will need this information later).

3. Open the file `<your_project_name>/android/app/src/main/res/values/strings.xml` and insert the string with the generated client ID. For example, if the generated client ID on Google is `XXXXX-XXXXXXXX.apps.googleusercontent.com`, then you should add the string and save:

```xml
<string name="server_client_id">XXXXX-XXXXXXXX.apps.googleusercontent.com</string>
```

4. Open the `<your_project_name>/android/app/build.gradle` file and find the line of code with `implementation "com.facebook.react:react-native:+"`. Below this line, if it doesn't already exist, add the Google signing implementation `implementation(project(":react-native-community_google-signin"))` and save. It should look like this:

```js
...
   implementation "com.facebook.react:react-native:+"
   implementation(project(":react-native-community_google-signin"))
...

```

At the very end of the same file, add the line `apply plugin: 'com.google.gms.google-services'`.

5. Now open the file `<your_project_name>/android/build.gradle`, find the `buildscript` object: you will add at the end of the `ext` value a `googlePlayServicesAuthVersion = "16.0.1"` and at the end of `dependencies` the value `classpath ('com.google.gms:google-services:4.1.0')`. It should look like this:

```js
buildscript {
   ext {
       buildToolsVersion = "29.0.2"
       minSdkVersion = 16
       compileSdkVersion = 29
       targetSdkVersion = 29
       googlePlayServicesAuthVersion = "16.0.1" // <- For Google Login
   }
   repositories {
       google()
       jcenter()
   }
   dependencies {
       classpath("com.android.tools.build:gradle:3.5.3")
       classpath ('com.google.gms:google-services:4.1.0') // <- For Google Login
   }
}
...
```

### iOS Configuration (Mac and access to XCode Required)

You can follow the [official documentation](https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md#install-google-sign-in-sdk) to configure this, but below, brief steps will be provided.

1. At The google console (as explained in previous steps), create or use an existing Google Project. At the window `Configure your OAuth client`, choose the `iOS` option. Visit XCode and find your Bundle Identifier (as explained at the iOS Facebook tutorial) and click Create. Download your client configuration and save the Client ID for later.

2. Open your project on XCode, double-click in the project name in the left tree view. Select your app from the TARGETS section, then select the `Info` tab, and expand the `URL Types` section. Locate the `+` button and add the REVERSED CLIENT ID as your URL scheme. The reversed client ID is your client ID with the order of the dot-delimited fields reversed. [From the documentation](https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project), as an example, if you have a client id as `1234567890-abcdefg.apps.googleusercontent.com`, you should enter in your URL Schemes as `com.googleusercontent.apps.1234567890-abcdefg`.

3. Similarly to Facebook, you will need to add google services to your project's Podfile at `<your_project_name>/ios/Podfile`. You should add the following ` pod 'GoogleSignIn', '~> 5.0.2'`:

```pod
...
 pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

 pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'

  pod 'GoogleSignIn', '~> 5.0.2'# ,_ Add this line HERE
...
```

Then, on terminal, navigate to `<your_project_name>/ios/` folder and run:

```sh
pod install
```

4. Lastly, open the file `src/features/<your_module_folder>/auth/utils.js` inside your installed module and change the value for the variable `GOOGLE_IOS_CLIENT_ID` with your own ios client id.

## Configuring Apple Signin (Apple Developer account, iOS and Xcode required)

To be able to user signing with apple feature, it is required that you have access to a developer account with access for creating [certificates, identifiers and keys](https://developer.apple.com/support/certificates/). If you already have a Service Identifier, make sure to update your identifier with `Signin with Apple` capability (point e-g below). If you already completed the backend configuration, you can skip steps 1-3 and just make sure to get access to those values (bundle ID, service ID, Key Secret, etc).

1. First, create a app ID at `https://developer.apple.com/account/resources/certificates/list`. Go to `Identifiers`, click on the `+` sign beside Identifiers or click on this page: [Register new identifier](https://developer.apple.com/account/resources/identifiers/add/bundleId).
   a) Choose App id and click Continue
   b) Choose App option and continue
   c) Add your app's name in the `description` field. Add your bundle ID ([bundle identifier](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids)) that can be found on the XCode page.
   d) Go to Capabilities and enable.
   e) Click in the edit button, select `Enable as a primary App ID` and save
   f) Click continue. Verify all the input information and if everything is correct, click `Register`

2. Now, register for a Service ID.
   a) Go to the same page as before, but now choose `Service IDs` option.
   b) Insert your desired description and create an identifier (it could be your bundle ID)
   c) Enable `Signin with apple` and on clicking `Configure`, choose your Primary App ID.
   d) There, you will be asked to select your primary App ID (select the one created earlier). Then, add your app's domain to the `Website Urls` section available. Your domain should be the same that you use to access your web app (as was described before). For this tutorial, we have `social-login-1234.botics.co`. Also add a url that looks like `<your_app_domain_url>/accounts/apple/login/callback/`. In the tutorial, we have `https://social-login-1234.botics.co/accounts/apple/login/callback/`.
   e) Save everything
   f) Verify if information is correct and click Register.

3. Now go to `Keys` tab and click on `+` to add a new key (or navigate to [Register a New Key](https://developer.apple.com/account/resources/authkeys/add) page).
   a) Add a name for your key (choose some unique name)
   b) Enable `Signin with Apple` and click in `Configure` button
   c) If asked about domains, insert the same values that you did for Service IDs website urls.
   d) Save everything and **download the generated certificate**.

4. Open your project on XCode, double-click in the project name in the left tree view. Select your app from the TARGETS section, then choose the `Singin & Capabilities` tab. Enable `Automatically manage signing`. For a more visual explanation, visit the [official library tutorial](https://github.com/invertase/react-native-apple-authentication/blob/master/docs/INITIAL_SETUP.md) with screenshots.

### Apple Signin for Android

Open your the file `src/features/<your_module_name>/auth/utils.js` and update the following constant values:

```js
// Add the service ID you just created on Apple. e.g.:
export const APPLE_SERVICE_ID = "com.crowdbotics.social-login-1234";
// Add below the callback url as <your_app_domain_url>/apple/login/callback/. e.g.:
export const APPLE_REDIRECT_CALLBACK =
  "https://social-login-1234.botics.co/accounts/apple/login/callback/";
```

### Apple Singin for iOS

If you enabled Signin with Apple on XCode, you are mostly done with Apple signing. Verify if your app is in a iOS version of 13.0 or higher, since this is the version where Apple Singin was introduced. You can do that by both checking your project on XCode in the `General` tab, under `Deployment Info` and searching across your code for `IPHONEOS_DEPLOYMENT_TARGET`, which should be targeted to 13.0 or higher.

However, there could be a variety of issues during iOS deployment. Below you will see a list of helpful links to debug possible deployment issues on iOS.

## Acknowledgements

Note that the majority of the configuration here is to help you get started with all social login apps. You will need to properly configure your app further by checking the official documentation for all providers (Google, Facebook and Apple) in order to get your app ready for release and accepted by the app store. Such configurations include:

- Explicitly activating or deacativating Facebook tracking and other Facebook features to be compliant with iOS App Store
- Changing Facebook app and Google Credentials for release, by updating the SHA-1 key from debug to release and including privacy policy according to their guidelines

## References and Troubleshooting

1. Error when building: [FBSDKCoreKit/FBSDKCoreKit.modulemap' not found](https://github.com/facebook/react-native-fbsdk/issues/780#issuecomment-672754083)
2. [Official docs for Facebook and iOS](https://developers.facebook.com/docs/facebook-login/ios)
3. [Official docs for Google and iOS](https://developers.google.com/identity/sign-in/ios)
4. [Official docs for signin with Apple](https://developer.apple.com/documentation/authenticationservices/implementing_user_authentication_with_sign_in_with_apple)
5. [AutheorizationError error 1000 when testing on iOS simulator](https://github.com/invertase/react-native-apple-authentication/issues/9#issuecomment-614439405) 6.[Issues with architecture when building on simulator](https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios)
6. [React-Native signin with apple library & tutorial](https://github.com/invertase/react-native-apple-authentication/blob/master/docs/INITIAL_SETUP.md)
7. [iOS Simulator stuck on password input](https://github.com/invertase/react-native-apple-authentication/issues/141)
8. [DEVELOPER_ERROR when trying to login on appetize, but working locally](https://github.com/react-native-google-signin/google-signin/issues/949#issuecomment-778070056)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.