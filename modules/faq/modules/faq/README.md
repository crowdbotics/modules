# Freqently asked questions

This module is responsible for showing the FAQ list with a pagination. Additionally, it also provide a search FAQ feature with the fetched FAQ list.

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import FAQ from "@modules/faq";

const { title, navigator, slice } = FAQ;
```

## Configuring the FAQ module Frontend

All that is required to configure the frontend is to edit the url variable in `options/options.js` to point to your app's url on the web. That url should have a trailing slash.

```
export const globalOptions = {
  name: "demoIdentifier",
  url: "https://<your-app-url-here>.botics.co/",
  api: "https://<your-app-url-here>.co/api/v1"
}

```

## Styling

The parent view styling (which contains search bar and Flatlist) can be upodated from `options.js` of module and the render item (or Flatlist item) styling can be updated from `FAQItem.js`.

## Pagination

By default, per page returns 10 FAQs. If you want to change its value then you can update the recordsPerPage variable from `options.js`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
