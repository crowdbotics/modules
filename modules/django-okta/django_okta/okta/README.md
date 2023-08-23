# Okta

## Module description

By using this module user can sign in to multiple apps at once.

Features included:
1. Sign in through social accounts
2. Sing in to connected apps at once

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## 3rd party setup

### Okta ODIC (OpenID Connect) App Setup

1. Create an account on [Okta](https://www.okta.com/free-trial/).
2. Click on `Application` tab from the sidebar.
3. Click on `Create App Integration` button.
4. Select `OIDC - OpenID Connect` as Sign-in method and `Native Application` as your Application type.Click `Next`
   button.
5. Enter app name, choose `Authorization Code` and `Refresh Token` from **Grant Type** section.
6. Provide `Sign-in redirect URIs` and `Sign-out redirect URIs`.
7. Select `Allow everyone in your organization to access` from **Assignments** section, and click **Save** button.
8. Assign the app to the users by clicking on `Assignments` tab. These will be able to access your app.

### Okta React Native for ODIC (OpenID Connect) App

Install [Okta React Native](https://www.npmjs.com/package/@okta/okta-react-native/v/2.6.0) package. Use `createConfig` method to configure the client successfully.

### Okta SAML 2.0 App Setup

1. Click on `Application` tab from the sidebar.
2. Click on `Create App Integration` button.
3. Select `Sign-in method` as Sign-in method and click **Next** button.
4. Enter app name and click **Next** button.
5. Enter `Single sign on URL` and `Audience URI (SP Entity ID)` in **SAML Settings** section and click **Next** button.
6. Choose `I'm an Okta customer adding an internal app` radio button and
   check `This is an internal app that we have created` checkbox. Click **Finish** button.
7. Assign the app to the users by clicking on `Assignments` tab. These will be able to access your app.

### Enable Sign-On authentication

You must enable sign-on authentication to to get stateToken to logout your user.

1. On dashboard, In sidebar under the **Security** tab click `Multifactor`. A list of **Factor Types** will appear.
   Activate any of the **Factor Types**.
2. Click on **Factor Enrollment** tab. In **Default Policy** section `Factor Type` that was activated previously will
   appear here. click on `Edit` button and set that **Factor Types** `required`. Click **Save** button.
3. In sidebar under the **Security** tab click `Authentication`.
4. On **Authentication** page click `Sign-On` tab. Click on **Add rule** button.
5. Enter `Rule name`, set `Multifactor authentication (MFA) is` radio button to required.
   Select `When signing in with a new device cookie` radio button. Lastly,
   check `Select "Don't prompt me again for MFA" by default` checkbox and click **Create rule** button.

### Create Google as Social Identity Provider.

Okta integrates with many Identity Providers. Select an Identity Provider card to add [social login](https://developer.okta.com/docs/guides/identity-providers/#enterprise-identity-providers) to your app.

**Create an app at the Identity Provide**

1. Make sure that you can access the [Google Developers Console](https://console.developers.google.com/).
2. Create a Google project using
   these [instructions](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).
3. In the `Authorized redirect URIs` section of the creation wizard, click `ADD URI` to add the Okta redirect URI for
   your app integration.
4. Paste your redirect URI into the text box.
5. Save the client_Id and Client_secret for later use.

**Create the Identity Provider in Okta**

1. In sidebar under the **Security** tab click `Identity Providers`.
2. Click on `Add identity provider` button. Select any `Google` from the available list and click `Next` button.
3. Enter a name for the Identity Provider configuration.
4. Paste the `client ID` and `Secret ID` that you obtained from the Google Developers Console.
5. Leave the scopes defaults. and click the `Finish` button.
6. Hit the following url in the browser with your keys.
   `https://{YOUR_OTKA_DOMAIN_HERE}.okta.com/oauth2/v1/authorize?idp={IDP_ID_HERE}&client_id={APP_CLIENT_ID_HERE}&response_type=id_token token&response_mode=fragment&scope=openid%20profile%20email&redirect_uri={sign_in redirect url}&state=WM6D&nonce=YsG76jo`
7. After successful authentication, the you will be redirected to the redirect URI that you specified, along with
   an `#id_token` and `#access_token`.

## Update Settings

In `settings.py` add the following:

```py
OKTA_BASE_URL = "https://{your_Okta_domain}/api/v1"
OKTA_API_TOKEN = "Token created on Okta"
```


## API Details

List of api's endpoints with params needed for these apis.

| Api Name         |           Param           | Description                                                  |
|------------------|:-------------------------:|:-------------------------------------------------------------|
| `login/`         |      `signin_object`      | See **signin_object** below.                                 |
| `logout/`        | object `{stateToken: ""}` | To logout a user, pass the state token assigned to the user. |
| `okta-callback/` |             -             | Called after the authentication confirmed from the okta.     |
| `create-user/`   |       `user_object`       | See **user_object** bellow.                                  |

### Signin Object

**signin_object** has some extra options to get `stateToken` which will be used to sign out the user.

```javascript
{
    username: "john6551@doe.com",
    password : "john123",
    options: {
        multiOptionalFactorEnroll: false,
        warnBeforePasswordExpired: true
    }
}
```

### User Object

**User object** contains the user details that is going to be added. this `user_object` will look something like this:

```javascript
{
    profile: {
        firstName: "DemoTemp",
        lastName: "Brock",
        email: "pixedon897@mliok.com",
        login: "pixedon897@mliok.com"
    }
    credentials: {
        password : {
            value: "pass@123"
        }
        recovery_question: {
            question: "what is you father name",
            answer: "Annie Oakley"
        }
    }
}
```

```javascript
import {createConfig} from '@okta/okta-react-native';

await createConfig({
    issuer: "https://{yourOktaDomain}/oauth2/default", // Optional
    clientId: "{clientId}",
    redirectUri: "{redirectUri}",
    endSessionRedirectUri: "{endSessionRedirectUri}",
    discoveryUri: "https://{yourOktaDomain}",
    scopes: ["openid", "profile", "offline_access"],
    requireHardwareBackedKeyStore: true, // Optional
    androidChromeTabColor: "#FF00AA", // Optional
    browserMatchAll: true, // Optional
    httpConnectionTimeout: 15, // Optional
    httpReadTimeout: 10, // Optional
});
```

This method will create a configured client on the native modules. Resolves true if successfully configures a client.

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/196x2hd5SVwGvG2KhJdDCZ2o4ksPlKpQNpF6JRHVA4gM/edit?usp=sharing),
which provides more information about the module's features.
