# Crowdbotics Social Login Module - Backend
This module contains all needed resources and information to setup Social Login in your app backend.

## Extra installation steps
After adding this module to your project, you need to include the facebook authentication third party app in your `settings.py` file. To do that, open your project's settings.py file - it should be in the path `/<your_repo_name>/backend/<your_repo_name>/settings.py`, where <your_repo_name> is the name of your project's repository. For example, if my repository name is `social_login_1234`, my file should be located at `social_login_1234/backend/social_login_1234/settings.py`.

Once the file is opened, locate in the code a declaration for `THIRD_PARTY_APPS` and include `'allauth.socialaccount.providers.facebook',` at the end. Your app might already have `'allauth.socialaccount.providers.google'` added there, so you should verify; but if it is not there, then add it as well. Your code section should look roughly like this:

```py
THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'allauth.socialaccount.providers.google',

    # More apps added before here...

    'allauth.socialaccount.providers.facebook',
]
```

You should now deploy your app's backend in order to proceed to the next step.

## Configuring Facebook
You need to setup Facebook SDK to get social login properly configured in your app. Ideally, these steps should be done by the project owner or with an project owner account, as it needs to be properly configured for app store release, but it can be done with development configurion during development phase. 

1. First, access Facebook for developers at https://developers.facebook.com and register for a developer account, if you do not already have one.

2. After that, access the [your facebook apps page](https://developers.facebook.com/apps/) and choose to create a Facebook app. FOr the purpose of social login, you could choose the `build connected experiences` upon facing the question "What do you need your app to do?" and click continue (as shown below). In the next page, type in the name of your app, contact email and, if existing, business manager account for the app and click `Create App`:

![facebook-create-app](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/15c9063c-6f5d-4afa-a77f-76f75c15e062.png)
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/ff97ef37-8535-4f4b-958f-def310bf110d.png)

3. After creation, go to your Facebook app's dashboard and look for an option to set up social login product to your app. The url should look like this: `https://developers.facebook.com/apps/<your_facebook_app_id>/fb-login/quickstart/`. There, choose the web option (to register a key to your backend).

4. Then, you will be prompted to add your website url (point 1 in the image below) and save (point 2) - your website url is where your backend is being served - you can find this url by clicking on `View App` at crowdbotics dashboard `Settings` page. Check out our knowledge base for more information.

5. After saving, navigate to Facebook dashboard at `Settings -> Basic` (as shown in point 3 of image below).
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/596578e6-d64c-4d04-a4fa-712da80aa1f5.png)

You need to keep this page open and navigate to another browser tab, as you will need to copy both `App ID` and `App Secret` to paste on your own project admin page. 

6. Navigate to Crowdbotics dashboard for your app and access your app's admin panel. If you do not know what does this mean, please, check out our [Knowledge Base Article](https://knowledge.crowdbotics.com/what-is-the-admin-panel).

At your app's admin page, try to find `Social Accounts` section and click on `Social Applications`: 
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/9babfe52-423f-40dc-afa0-a5d038782640.png)

7. Then, click to `Add a social Application +` on the button at the right side of your screen. Fill out the form as follows and save:

- Provider: Facebook
- Name: Facebook (or any name you would like to give that helps you identify this facebook configuration)
- Client id: Your `App ID` from facebook settings
- Secret Key: The `App Secret` from facebook settings
- Sites: your website url, just move it to the right panel. 

It should end up as something like this:

![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/fc889f58-78a5-4828-abb2-4285acac560e.png)

Your backend is now ready to accept facebook login. Redeploy your application so all changes are applied to the server.

## Configuring Google
Similarly to Facebook, Google login should ideally be configured in the Google account that is going to manage everything related to this project (usually, the project owner). But for development purposes, it can temporarily be configured by anyone.

1. Configure your Google Cloud account to access the [console](https://console.developers.google.com/), and to start a quick setup of an API project, visit https://developers.google.com/identity/sign-in/android/start#configure-a-google-api-project and click on `Configure a Project`. 
2. There, you will choose to create a new project (or your an existing one, if desired). Follow the instructions, filling out product name, choosing `Web Server` as your OAuth client and pasting your app's url as the Authorized redirect URIs (for example, this tutorial app link is `https://social-login-1234.botics.co/`). 
Finish up and `Download Client Configuration` (you will need this information later).

3. Navigate to Crowdbotics dashboard for your app and access your app's admin panel to add the Google API information. To do so, follow steps 6 and 7 from the Facebook configuration above, and input the form values as follows:

- Provider: Google
- Name: Google (or any name you would like to give that helps you identify this google configuration)
- Client id: Your `Client ID` (`client_id`) from Google's credentials configuration
- Secret Key: The `Client Secret` (`client_secret`) Google's credentials configuration
- Sites: your website url, just move it to the right panel. 
