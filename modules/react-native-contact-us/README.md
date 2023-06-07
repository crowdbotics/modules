# Contact Us
This module will be used by users for contacting the customer support or app owner

# Global Configs
## Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

# Local Configs
## Update local options  in modules/contact-us/options.js
```
export default {
  email: "admin@admin.com",
  textMessage: "textMessage"
};
```
## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import ContactUs from "@modules/contact-us";

const { title, navigator } = ContactUs;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const ContactUs = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<ContactUs />
```
# Features
User can contact the admin

User can write email to the admin directly 