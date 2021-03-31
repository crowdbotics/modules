# Privacy Policy

The Privacy Policy is a ReactNative based screen that leverages the parallax with a custom header.

### Set the left arrow screen redirect and website link.

`modules/privacy-policy/index.js`

Update the value of `PRIVACY_WEBSITE_URL` in `index.js` with the desired website you would like to redirect users to:

```js
const PRIVACY_WEBSITE_URL = "https://www.crowdbotics.com/privacy-policy";
```

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import PrivacyPolicy from "@modules/privacy-policy";

const { title, navigator } = PrivacyPolicy;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
