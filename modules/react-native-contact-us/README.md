# Contact Us
This module will be used by users for contacting the customer support or app owner
# Features
User can contact the admin

User can write email to the admin directly 
## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
  "@react-navigation/native": "6.0.8",
  "@react-navigation/native-stack": "6.5.0",
  "react-native-screens": "3.10.2"
```
and run this command.
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api/index.js` file.

* **sendQuery**
`sendQuery` method takes an object containing `email`, `message`, `name`, and sends queries to admin.

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
### Module Specifications
Here is the m[Module Specification Document](https://docs.google.com/document/d/1Qpt2bEOMZx3KbVVhpXwv-b0jKutmCv0lHMPmrBgSf_0/edit?usp=sharing), which provides more information about the module's actual intentions.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)