# Typeform Webhook


## Global Configs
### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## Local Configs
In modules/typeform-webhook/options.js, update the following:

```
const REDIRECT_URI = "";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const WEBHOOK_URL = "";
const WEBHOOK_TAG = "";

```
## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import TypeformWebhooks from "@modules/typeform-webhook";

const { title, navigator } = TypeformWebhooks;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const TypeformWebhooks = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<TypeformWebhooks />
```
## Features

## Retrieve forms from Typeform
User can view all forms from Typeform

## Create and update webhook
user can create and update webhook

## Open a form and respond
User can open a form and respond 

## View responses
User can view responses



https://user-images.githubusercontent.com/76822297/176876521-bbdc9367-7c39-4138-af66-68ed7d841a72.mp4

