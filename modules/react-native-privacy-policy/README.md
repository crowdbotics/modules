# Privacy Policy Screen

The Privacy Policy Screen is a React Native based screen that renders plaintext privacy policy with a simple header.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import PrivacyPolicy from "@modules/privacy-policy";

const { title, navigator } = PrivacyPolicy;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript

import { modules } from '@modules';

const PrivacyPolicy = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<PrivacyPolicy  />

```

## Params

Below is the list of all params that can be passed to the module.

| Name                  | Type       | Description                                                    |
| --------------------- |:----------:|:---------------------------------------------------------------|
| headingContainerStyle | `object`   | Set style for the heading container|
| headingTextStyle       | `object` |  Set style for the heading text.             |
| contentContainerStyle | `object`   | Set style for the privacy policy content container.                 |


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

Additional url configuration is possible by changing your main urls.py (not the privacy urls.py) and/or changing privacy/urls.py

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
