# Social Login React native specs

## Module description

This is React Native module for social login feature. For this feature to be fully functional, you will need to install and configure Social Login - Backend module.

 - Login using “Facebook”.
 - Login using “Google”.
 - Login using “Apple”.
 - Login/signup using a simple email.
 - Password recovery through forgot password.

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/050f83cd-63fc-4046-ba5f-da439a934101)


## ## Features

 - [x] This module includes environment variables.
 - [x] This module requires manual configurations.
 - [x] This module can be configured with module options.
 - [x] This module requires manual Android setup.
 - [X] This module requires manual iOS setup.

## ## 3rd party setup

#### Configuring Facebook developer account

You need to set up Facebook SDK to get social login properly configured in your app. Ideally, these steps should be done by the project owner or with an project owner account, as it needs to be properly configured for app store release, but it can be done with debug configuration during the development phase.

Ultimately, you need to follow the [react-native-fbsdk instructions](https://github.com/facebook/react-native-fbsdk#3-configure-projects) to configure your app, but it will be provided steps in this README to accomplish this configuration for a Crowdbotics app.

1. First, access Facebook for developers at https://developers.facebook.com and register for a developer account, if you do not already have one.

2. After that, access the [your facebook apps page](https://developers.facebook.com/apps/) and choose to create a Facebook app. For the purpose of social login, you could choose the `build connected experiences` upon facing the question "What do you need your app to do?" and click continue (as shown below). In the next page, type in the name of your app, contact email and, if existing, business manager account for the app and click `Create App`:

![facebook-create-app](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/15c9063c-6f5d-4afa-a77f-76f75c15e062.png)
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/ff97ef37-8535-4f4b-958f-def310bf110d.png)

3. After creation, go to your app's dashboard and look for an option to set up a social login product to your app. The url should look like this: `https://developers.facebook.com/apps/<your_facebook_app_id>/fb-login/quickstart/`. There, choose the Android option (for your Android app) and iOS option (for your iOS app configuration).

#### Configuring Google Login

Similarly to Facebook, Google login should ideally be configured in the Google account that is going to manage everything related to this project (usually, the project owner). But for development purposes, it can temporarily be configured by anyone.


1. Configure your Google Cloud account to access the [console](https://console.developers.google.com/), and to start a quick setup of an API project, visit https://developers.google.com/identity/sign-in/android/start#configure-a-google-api-project and click on `Configure a Project`. Then follow the instructions for each application type below.

#### Configuring Apple Signin 
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
   
## Dependencies



Dependencies used:
- @react-native-google-signin/google-signin  -  https://www.npmjs.com/package/@react-native-google-signin/google-signin
- react-native-fbsdk  -  https://www.npmjs.com/package/react-native-fbsdk
- react-native-keyboard-aware-scroll-view  -  https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view
- @invertase/react-native-apple-authentication  -  https://www.npmjs.com/package/@invertase/react-native-apple-authentication  
- @react-navigation/native  -  https://www.npmjs.com/package/@react-navigation/native
- @react-navigation/stack  -  https://www.npmjs.com/package/@react-navigation/stack
- uuid  -  https://www.npmjs.com/package/uuid
- react-native-get-random-values  -  https://www.npmjs.com/package/react-native-get-random-values

## ## Module Options

### Global Configs

Update the ``options/options.js`` file with your app's backend url.

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

Update these values in `module/options.js`:

```js
GOOGLE_WEB_CLIENT_ID
GOOGLE_IOS_CLIENT_ID
APPLE_SERVICE_ID
APPLE_REDIRECT_CALLBACK
```

### Android setup

#### Facebook and google setup

Add the plugin on `android/app/build.gradle` (at the end of the file):

```
apply plugin: 'com.google.gms.google-services'

```

Add the following to the `dependencies` section in `android/app/build.gradle`:

```
implementation 'com.facebook.android:facebook-android-sdk:latest.release'
```

Add the tag on `android/app/src/main/AndroidManifest.xml`:

```
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
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

Add the following to the `buildscript > repositories` section:

```
        mavenCentral()
```

Update the file `android/app/src/main/res/values/strings.xml` with the follow string (the value might need to be replaced later): 

```
<string name="facebook_app_id">Your_facebook_id_here</string>
<string name="facebook_client_token">56789</string>

```

#### For New scaffold `0.71.7`
For the new scaffold support the library being used for facebook login is changed. So follow `react-native-fbsdk-next` [installation guide.](https://www.npmjs.com/package/react-native-fbsdk-next?activeTab=readme#installation)

#### Apple signin


Open your the file `src/features/<your_module_name>/auth/utils.js` and update the following constant values:

```js
// Add the service ID you just created on Apple. e.g.:
export const APPLE_SERVICE_ID = "com.crowdbotics.social-login-1234";
// Add below the callback url as <your_app_domain_url>/apple/login/callback/. e.g.:
export const APPLE_REDIRECT_CALLBACK =
  "https://social-login-1234.botics.co/accounts/apple/login/callback/";
```

### iOS setup

### Facebook login

#### For Old scaffold `0.64` 

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

#### For New scaffold `0.71.7`
For the new scaffold support the library being used for facebook login is changed. So follow `react-native-fbsdk-next` [installation guide.](https://www.npmjs.com/package/react-native-fbsdk-next?activeTab=readme#installation)


### Google Login

Open your project on XCode, double-click in the project name in the left tree view. Select your app from the TARGETS section, then select the `Info` tab, and expand the `URL Types` section. Locate the `+` button and add the REVERSED CLIENT ID as your URL scheme. The reversed client ID is your client ID with the order of the dot-delimited fields reversed. [From the documentation](https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project), as an example, if you have a client id as `1234567890-abcdefg.apps.googleusercontent.com`, you should enter in your URL Schemes as `com.googleusercontent.apps.1234567890-abcdefg`.

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

### Apple Login

 Open your project on XCode, double-click in the project name in the left tree view. Select your app from the TARGETS section, then choose the `Singin & Capabilities` tab. Enable `Automatically manage signing`. For a more visual explanation, visit the [official library tutorial](https://github.com/invertase/react-native-apple-authentication/blob/master/docs/INITIAL_SETUP.md) with screenshots.

 If you enabled Signin with Apple on XCode, you are mostly done with Apple signing. Verify if your app is in a iOS version of 13.0 or higher, since this is the version where Apple Singin was introduced. You can do that by both checking your project on XCode in the `General` tab, under `Deployment Info` and searching across your code for `IPHONEOS_DEPLOYMENT_TARGET`, which should be targeted to 13.0 or higher.
 
