# Crowdbotics Social Login Module - Backend
This module contains all needed resources and information to set up Social Login in your app backend.

## Requirements
- The project must have `django-allauth` with version 0.43.0 or higher in order to support Apple provider

## Extra installation steps
After adding this module to your project, you need to include the facebook authentication third party app in your `settings.py` file. To do that, open your project's settings.py file - it should be in the path `/<your_repo_name>/backend/<your_repo_name>/settings.py`, where <your_repo_name> is the name of your project's repository. For example, if my repository name is `social_login_1234`, my file should be located at `social_login_1234/backend/social_login_1234/settings.py`.

Once the file is opened, locate in the code a declaration for `THIRD_PARTY_APPS` and include `'allauth.socialaccount.providers.facebook',` and `'allauth.socialaccount.providers.apple',` at the end. Your app should already have `'allauth.socialaccount.providers.google'` added there, so you should verify; but if it is not there, then add it as well. Your code section should look roughly like this:

```py
THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'allauth.socialaccount.providers.google',

    # More apps added before here...

    'allauth.socialaccount.providers.facebook', # add this line here
    'allauth.socialaccount.providers.apple', # add this other line
]
```

Go to the end of the file and add the following code:

```js
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
}
```

You should now deploy your app's backend in order to proceed to the next step.

## Configuring Facebook
You need to setup Facebook SDK to get social login properly configured in your app. Ideally, these steps should be done by the project owner or with an project owner account, as it needs to be properly configured for app store release, but it can be done with debug configuration during the development phase. 

1. First, access Facebook for developers at https://developers.facebook.com and register for a developer account, if you do not already have one.

2. After that, access the [your facebook apps page](https://developers.facebook.com/apps/) and choose to create a Facebook app. FOr the purpose of social login, you could choose the `build connected experiences` upon facing the question "What do you need your app to do?" and click continue (as shown below). In the next page, type in the name of your app, contact email and, if existing, business manager account for the app and click `Create App`:

![facebook-create-app](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/15c9063c-6f5d-4afa-a77f-76f75c15e062.png)
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/ff97ef37-8535-4f4b-958f-def310bf110d.png)

3. After creation, go to your Facebook app's dashboard and look for an option to set up social login product to your app. The url should look like this: `https://developers.facebook.com/apps/<your_facebook_app_id>/fb-login/quickstart/`. There, choose the web option (to register a key to your backend).

4. Then, you will be prompted to add your website url (point 1 in the image below) and save (point 2) - your website url is where your backend is being served - you can find this url by clicking on `View App` at crowdbotics dashboard `Settings` page. Check out our knowledge base for more information.

5. After saving, navigate to Facebook dashboard at `Settings -> Basic` (as shown in point 3 of image below).
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/18906/596578e6-d64c-4d04-a4fa-712da80aa1f5.png)

You need to keep this page open and navigate to another browser tab, as you will need to copy both `App ID` and `App Secret` to paste on your own project admin page. 

6. Navigate to the Crowdbotics dashboard for your app and access your app's admin panel. If you do not know what this means, please, check out our [Knowledge Base Article](https://knowledge.crowdbotics.com/what-is-the-admin-panel).

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
2. There, you will choose to create a new project (or your an existing one, if desired). Follow the instructions, filling out product name, choosing `Web Server` as your OAuth client and pasting your app's url as the Authorized redirect URIs and your app's url appended with `/accounts/google/login/callback/`.
For example, this tutorial app link is `https://social-login-1234.botics.co/` so you should provide both `https://social-login-1234.botics.co/` and `https://social-login-1234.botics.co/accounts/google/login/callback/`.
Finish up and `Download Client Configuration` (you will need this information later).

3. Navigate to Crowdbotics dashboard for your app and access your app's admin panel to add the Google API information. To do so, follow steps 6 and 7 from the Facebook configuration above, and input the form values as follows:

- Provider: Google
- Name: Google (or any name you would like to give that helps you identify this google configuration)
- Client id: Your `Client ID` (`client_id`) from Google's credentials configuration
- Secret Key: The `Client Secret` (`client_secret`) Google's credentials configuration
- Sites: your website url, just move it to the right panel. 

## Configuring Apple
To be able to use Apple features, it is required that you have access to a developer account with access for creating [certificates, identifiers and keys](https://developer.apple.com/support/certificates/). If you already have a Service Identifier, make sure to update your identifier with `Signin with Apple` capability (point e-g below).

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
d) Save everything and __download the generated certificate__.

4. Now, open your projects' `settings.py` file, and at the end of the file, add the following, replacing the existing values with what you just created on Apple website above:

```py
SOCIALACCOUNT_PROVIDERS = {
    "apple": {
        "APP": {
            # Your service identifier.
            "client_id": "com.crowdbotics.social-login-1234,

            # The Key ID (visible in the "View Key Details" page).
            "secret": "sociallogintest1234",

             # Member ID/App ID Prefix -- you can find it below your name
             # at the top right corner of the page, or it’s your App ID
             # Prefix in your App ID.
            "key": "ABCDEFG",

            # The certificate you downloaded when generating the key.
            "certificate_key": """-----BEGIN PRIVATE KEY-----
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 
-----END PRIVATE KEY-----
"""
        }
    }
}
```

4. Save the settings.py file and commit everything to Github
5. On your apps admin panel, go to Social applications and create a new application for apple, adding the following values:
- Provider: Apple
- Name: A custom name, you can add it as `Apple API`
- Client ID: Your service ID created in previous steps (e.g. com.crowdbotics.social-login-1234)
- Secret Key: The KEY ID created previously (e.g. sociallogintest1234)
- Key: Your app ID prefix, usually your team ID (e.g. ABCDEFG)
- Sites: your website links

6. Save everything and redeploy your app. Your backend is now ready to receive Apple Authentication.

The following endpoints are available to be used:
![](https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/13307/a76bcdc2-320f-4c17-a47b-594551a2f24f.png)

## References and Helpful Links
- [Django-allauth and Apple signin](https://github.com/pennersr/django-allauth/pull/2424#issuecomment-670597679)
- [Facebook Login Official Docs](https://developers.facebook.com/docs/facebook-login/web/)
- [Google Login Official Docs](https://developers.google.com/identity/sign-in/web/server-side-flow)
