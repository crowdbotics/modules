# Terms & Conditions Screen

The Terms and Conditions Screen is a React Native based screen that renders a Terms and Conditions page with a simple header.

## Features

1. Retrieve terms and conditions from database and display for the app user.


## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's package.json file.
```
  "react-native-render-html": "^5.1.0"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import TermsAndConditions from "@modules/terms-and-conditions";

const { title, navigator } = TermsAndConditions;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const TermsAndConditions = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<TermsAndConditions  />
```

## Params

Below is the list of all params that can be passed to the module.

| Name                  | Type       | Description                                                    |
| --------------------- |:----------:|:---------------------------------------------------------------|
| headingContainerStyle | `object`   | Set style for the heading container|
| headingTextStyle       | `object` |  Set style for the heading text.             |
| contentContainerStyle | `object`   | Set style for the TermsAndConditions content container.                 |


## Configuring the Terms & Conditions Frontend
All that is required to configure the frontend is to edit the url variable in `options/options.js` to point to your app's url on the web. That url should have a trailing slash. 

```
export const globalOptions = {
  name: "demoIdentifier",
  url: "https://<your-app-url-here>.botics.co/",
  api: "https://<your-app-url-here>.co/api/v1"
}

```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
