# Terms And Conditions Webview Module
The Terms And Conditions Webview Module is a React Native based Module, by that means, a component that allows users to render a Terms And Conditions page through the url.

## Scope Features
The following are the key features in scope for this module. 

1. Ability to load the terms and conditions in the browser

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
 "react-native-webview": "11.23.0"
```
and run this command.
  ```
  yarn install
  ```

## Local Configs
In **modules/terms-and-conditions-webview/options.js** update `termsUrl` with your terms and conditions page url.

```javascript

const termsUrl = "";

```

## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params      | Data Types         | Description                                                       |
| ------------|:------------------:|:---------------------------------------------------------------|
| url         | String             | URL of the Terms And Conditions page need to be displayed in web view.  |



## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import TermsAndConditionsWebview from "@modules/terms-and-conditions-webview";

const { title, navigator } = TermsAndConditionsWebview;

```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const TermsAndConditionsWebview = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<TermsAndConditionsWebview url={"Your terms and conditions page url"} />;

```
## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1CN12SHKp3gXmw9p2yBbkdG3TJIVtckpABK5Wd9kGFKQ/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
