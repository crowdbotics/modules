# Privacy Policy WebView Module
The Privacy Policy WebView Module is a React Native based Module, by that means, a component that allows users to render a Privacy policy Web page through the url.

## Local Config
in **modules/privacy-policy-webview/options.js** update `privacyUrl`.

```javascript

const privacyUrl = "";

```

## Params

Below is the list of all Params with their data types that are considered primitive or the basic ones needed for our module to work.

| Params      | Data Types         | Description                                                       |
| ------------|:------------------:|:---------------------------------------------------------------|
| url         | String             | URL of the privacy policy page need to be displayed in web view.  |



## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import PrivacyPolicyWebview from "@modules/privacy-policy-webview";

const { title, navigator } = PrivacyPolicyWebview;

```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const PrivacyPolicyWebview = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<PrivacyPolicyWebview url={"Your privacy policy url"} />;

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
