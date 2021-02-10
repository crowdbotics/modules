# Social Login - Frontend Module
This is React Native code for social login feature. FOr this feature to be fully functional, you will need to install and configure Social Login - Backend module.

## Initial Setup

In this section, for every mention of `<module_directory>`, consider the directory name of this module installed in your app. For example, if the SocialLogin module has a folder/directory of name `SocialLogin12345`, then that's whar you should use to replace `<module_directory>`.

#### 1. Install the following required dependencies (by modifying the project's package.json file under the `dependencies` section and add the dependencies manually):

```js
"dependencies": {
  "@react-native-community/google-signin": "^5.0.0",
  "react-native-fbsdk": "^3.0.0"
}
```

#### 2. Open the `/src/navigator/mainNavigator.js` file and import the login navigator in the import section as shown:

```js
import SocialLogin from '../features/<module_directory>/navigator';
```

Then, add it to the AppNavigator, as follows:

```js
const AppNavigator = {
  SocialLogin: { screen: SocialLogin },
  //@BlueprintNavigationInsertion
...
```

#### 3. Add reducers to the store. Open `/src/store/index.js` file and add the following imports:

```js
import socialLoginSaga from '../features/<module_directory>/auth/sagas';
import socialLoginReducer from '../features/<module_directory>/auth/reducers';
```

Locate the store creation with `createStore`, add comma at end of the last reducer (possibily `customReducer`) and **ADD** below the following code `socialLoginReducer: socialLoginReducer`.

This is how your createStore should look like after modifications:

```js
const store = createStore(
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    socialLoginReducer: socialLoginReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);
```

Near the end, before the `export { store }` line, register the new sagas `sagaMiddleware` like this:

```js
sagaMiddleware.run(socialLoginSaga);
```

#### 4. Change the login screen destination to your desired screen/module (likely Home screen). 

To do that, open the `screens/constants.js` file and edit the `HOME_SCREEN_NAME` value with desired destination module. For example, if my home screen is called `HomeScreen1234535`, then I should change as follows: `export const HOME_SCREEN_NAME = 'HomeScreen1234535'`. If you desire, you can also update your logo image URL (be mindful that the size of the image should match the original ones for ideal results).

#### 5. Make sure your backend support SENDGRID for emailing (optional)

If your app's backend does not have SENDGRID environmental variables available, make changes to project backend settings (in `/backend/YOUR_PROJECT_NAME/settings.py` file) like below:

```python
EMAIL_HOST = env.str("EMAIL_HOST", "smtp.sendgrid.net")
EMAIL_HOST_USER = env.str("SENDGRID_USERNAME", "")
EMAIL_HOST_PASSWORD = env.str("SENDGRID_PASSWORD", "")
```

If this code already exists, you can just skip this step.

Next, you need to configure your own sendgrid credentials. Reference website: [Sendgrid](https://wwww.sendgrid.com)
Once configured, add the sendgrid credential information to your propject's environment variables.

Using the Crowdbotics Dashboard, navigate to "Settings" and select the tab "Environment Variables", here you will add the following variables:

```
SENDGRID_USERNAME
SENDGRID_PASSWORD
```

#### STEP 6: Update api url (optional)

If you have renamed your app through the Crowdbotics platform, you might need to change the reference url of your deployed app that is used to execute the api requests. To find out if you need to update, go to the file `src/config/app.js` and locate the `emailAuthAPIEndPoint`. If the value is your app's back-end url, then you do not need to change anything. If your current back-end url is different that what is shown there, update accordingly.

For example, after renaming my app from `loginapp` to `personalapp`, the code needs to be changed from:

```js
export const appConfig = {
  emailAuthAPIEndPoint: "https://loginapp-123.botics.co",
  ...
```

to

```js
export const appConfig = {
  emailAuthAPIEndPoint: "https://personalapp-123.botics.co",
  ...
```


Note for developers: you can access the user token through the redcuer state (i.e. `state.socialLogin.token` and user auth information like e-mail at `state.socialLogin.user`)


## Configuring Facebook
You need to setup Facebook SDK to get social login properly configured in your app. Ideally, these steps should be done by the project owner or with an project owner account, as it needs to be properly configured for app store release, but it can be done with development configurion during development phase. 

Ultimately, you need to follow the [react-native-fbsdk instructions](https://github.com/facebook/react-native-fbsdk#3-configure-projects) to configure your app, but it will be provided steps in this README to accomplish this configuration for a Crowdbotics app. 

1. First, access Facebook for developers at https://developers.facebook.com and register for a developer account, if you do not already have one.

2. After that, access the [your facebook apps page](https://developers.facebook.com/apps/) and choose to create a Facebook app. For the purpose of social login, you could choose the `build connected experiences` upon facing the question "What do you need your app to do?" and click continue (as shown below). In the next page, type in the name of your app, contact email and, if existing, business manager account for the app and click `Create App`:

![facebook-create-app](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/15c9063c-6f5d-4afa-a77f-76f75c15e062.png)
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/ff97ef37-8535-4f4b-958f-def310bf110d.png)

3. After creation, go to your app's dashboard and look for an option to set up social login product to your app. The url should look like this: `https://developers.facebook.com/apps/<your_facebook_app_id>/fb-login/quickstart/`. There, choose the Android option (for your Android app) and iOS option (for your iOS app configuration).

### Android Configuration
Upon entering the `Android` page on the Facebook login configuration, you can click next/continue for most steps. But you will need to pay attention to the following steps:
- _3. Tell Us about Your Android Project_
Here, they will ask for two things: `Package Name` and `Default Activity Class Name`. Your package name is located on `<your_project_name>/android/app/src/main/AndroidManifest.xml` file, at the first and second line of code as `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="<your_package_name>">`. For my test app, this name is: `com.social_login_1234`, so it should look like this

For activity class name, just add a `.MainApplication` to your package name. For example, the tutorial application will have the follwing values:

  - Package Name: com.social_login_1234
  - Default Activity Class Name: com.social_login_1234.MainApplication

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/606769e1-f8ac-4712-92e9-ef92455db6ae.png)

- _4. Add Your Development and Release Key Hashes_
At this step, you need to generate the key hash for your app. Consult the official documentation for more ifnormation on how to create a [development](https://developers.facebook.com/docs/android/getting-started/#create_hash) or [production key hash](https://developers.facebook.com/docs/android/getting-started/#release-key-hash) and insert the appropriate value for your Key Hashes and save.

- _6. Edit Your Resources and Android Manifest_
This step will tell you which files in your project to edit. `/app/res/values/strings.xml` is equivalent to `<your_project_name>/android/app/src/main/res/values/strings.xml`


After everything, open the file `<your_project_name>/android/app/build.gradle` look for `defaultConfig` object and add `multiDexEnabled true`. It will look something like this:

```js
...
    defaultConfig {
        applicationId "com.social_login_test_0_18906"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
    }
...
```

### iOS Configuration
Follow this configuration:
https://developers.facebook.com/docs/ios/getting-started/?sdk=cocoapods
https://developers.facebook.com/docs/ios/componentsdks#cocoapods

## Configuring Google Login
Similarly to Facebook, Google login should ideally be configured in the Google account that is going to manage everything related to this project (usually, the project owner). But for development purposes, it can temporarily be configured by anyone.

Before anything, open this file in your social login module `/src/features/<your_social_login_module_name>/auth/utils.js` and locate the variable `GOOGLE_WEB_CLIENT_ID` and update its value with the proper backend client id that you previously used to configure your `SocialLogin - Backend` module (Go to admin panel > Social Accounts > Social Applications, choose the Google application and copy the code in the `Client Id` field).

Ultimately, you need to follow the [react-native/google-signin instructions](https://github.com/react-native-google-signin/google-signin#project-setup-and-initialization) to configure your app, but it will be provided steps in this README to accomplish this configuration for a Crowdbotics app. 

1. Configure your Google Cloud account to access the [console](https://console.developers.google.com/), and to start a quick setup of an API project, visit https://developers.google.com/identity/sign-in/android/start#configure-a-google-api-project and click on `Configure a Project`. Then follow the instructions for each application type below.

### Android Configuration
2. There, you will choose to create a new project (or use an existing one, if desired). Follow the instructions, filling out product name, choosing `Android` as your OAuth client and filling out the form. There are two values to fill out here: One is your `Package Name` which can be found in your AndroidManifest, as described  in the Facebook step; the other is `SHA-1 signing certificate`: to get a debug/development key store, type on your app console:
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

4. Open the `<your_project_name>/android/app/build.gradle` file and find the line of code with `implementation "com.facebook.react:react-native:+"`. Below this line, add the google signing implementation `implementation(project(":react-native-community_google-signin"))` and save. It should look like this:

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

### iOS Configuration
Folow iOS guide for more information:
https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md


## License

[MIT](https://choosealicense.com/licenses/mit/)
