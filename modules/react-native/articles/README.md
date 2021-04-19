# Article List and Detail

## Setup

Open `modules/articles/store/api.js` and update the `baseURL` with your application's URL followed by `/modules/articles` which is the endpoint (ie. demo0122202101-24002.botics.com/modules/articles). The initial piece is your project name and the numeric piece is your project number.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Articles from "@modules/articles";

const { title, navigator, slice } = Articles;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
