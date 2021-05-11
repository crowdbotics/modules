# Privacy Policy Screen

The Privacy Policy Screen is a React Native based screen that renders plaintext privacy policy with a simple header.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import PrivacyPolicy from "@modules/terms-and-conditions";

const { title, navigator } = TermsAndConditions;
```

## Configuring the Privacy Policy Frontend
All that is required to configure the frontend is to edit the url in `index.js` to point to your app's url on the web. On line 14 of `index.js`, replace <APP_URL_HERE> with your App's url (you can get this from the crowdbotics dashboard). 
`fetch('https://<APP_URL_HERE>.botics.co/modules/terms-and-conditions/')`


Additional url configuration is possible by changing your main urls.py (not the privacy urls.py) and/or changing privacy/urls.py

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
