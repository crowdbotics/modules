# Typeform Webhook React native specs

## Module description

Typeform Webhook module receives data from typeform webhook. Also displays the typeform answers submitted against any typeform.

This module's features include:
- View all forms from Typeform
- Create and update webhook
- Open a typeform and submit its response. 
- View responses

![image](https://github.com/saad-abid-crowdbotics/modules/assets/76822297/a9f72dd7-7cc8-4840-ae5a-606446a301a3)


## ## Features

- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [x] This module can be configured with module options.
- [ ] This module requires manual Android setup.
- [ ] This module requires manual iOS setup.

## ## 3rd party setup

1. Login to [Typeform Webhook](https://www.typeform.com/signup/) site to create your Typeform Webhook Account.
2. From dashboard click on Create Typeform.
3. Select your type of typeform webhook.
4. Add content in it by cliking `+` icon from top left corner.
5. Then click on publish.
6. Your typeform webhook will create.
7. After that click on the `connect` from top mid menu bar.
8. Then Click on `Add a Webhook`.
9. Add your webhook endpoint URL and save it.
10. Save the `secret_key` for later use.

## Dependencies

Dependencies used:
- react-native-base64  - https://www.npmjs.com/package/react-native-base64
- @react-navigation/native  - https://www.npmjs.com/package/@react-navigation/native
- @react-navigation/native-stack  - https://www.npmjs.com/package/@react-navigation/native-stack
- react-native-screens  - https://www.npmjs.com/package/react-native-screens
- react-native-typeform-embed   - https://www.npmjs.com/package/react-native-typeform-embed 
- react-native-webview  - https://www.npmjs.com/package/react-native-webview

## ## Module Options

### Global Configs

Update the ``options/options.js`` file with your app's backend url.
```javascript
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

In `modules/typeform-webhook/options.js`, update the following:

```javascript
const REDIRECT_URI = "";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const WEBHOOK_URL = "";
const WEBHOOK_TAG = "";

```

### Android setup

No android setup required.

### iOS setup

No iOS setup required.
