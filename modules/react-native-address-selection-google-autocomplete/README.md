# Address Selection (Google Autocomplete) module
 Address Selection Autocomplete module reflect real searches. To determine what predictions to show, module looks for common queries that match when someone starts to enter into the search box. 

## Local Configs
In `modules/address-selection-autocomplete/options.js` provide your `GOOGLE_API_KEY`.

```javascript

const GOOGLE_API_KEY = "Your Google API key";

```

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import AddressAutoComplete from "@modules/address-selection-autocomplete";

const { title, navigator } = AddressAutoComplete;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';

const AddressAutoComplete = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<AddressAutoComplete />

```

## Params

Below is the list of all params that can be passed to the module.

| Name              | Type       | Description                                                    |
| ---------------   |:----------:|:---------------------------------------------------------------|
| googleApiKey `required` | `string`   | Your Google Maps API Key. Make sure you've enabled the Google Places API Web Service for that key using the Google API Console.|
| placeholder       | `string`   | placeholder text for the TextInput field.             |
| minLength | `number`   | minimum length of text to trigger a search.                 |
| fetchDetails  | `boolean`  | get more place details about the selected option from the Place Details API. |
| onChangeText  | `function`  |Callback function returns input text as it's param.|
| onPress | `function` | Called when after a suggestion is selected, returns `data` and `details` as it's params.|
| onFail | `function` | Called if an unspecified error comes back from the API.|
| onNotFound | `function` | Called if the Google Places Details API returns a 'not found' code (when you press a suggestion).|
| styles | `object` | Style object to style the search places field.           |
| predefinedPlaces | `array` | Array of object, each object contains a locations. This location object will be something like this `{description: "", geometry{location: {lat:48.8152937, lng:2.4597668} } }`. |
| predefinedPlacesAlwaysVisible | `boolean` | Shows predefined places at the top of the search results. By default it's false.|
| autoFillOnNotFound | `boolean` | Displays the result from autocomplete if the place details api return not found.|
| currentLocation | `boolean` | Will add a 'Current location' button at the top of the predefined places list. |
| currentLocationLabel | `string` | Change the display label for the current location button.|
| disableScroll | `boolean` | Disable scroll on the results list.|
| enablePoweredByContainer | `boolean` | Show "powered by Google" at the bottom of the search results list. |
| isRowScrollable | `boolean` | Enable/disable horizontal scrolling of a list result.|
| listUnderlayColor | `string` | Underlay color of the list result when pressed. |
| listViewDisplayed | `string` | Override the default behavior of showing the list (results) view. Can select one from `'auto' | true | false` options.|
| renderLeftButton | `function` | Add a component to the left side of the Text Input|
| renderRightButton | `function` | Add a component to the right side of the Text Input. |
| timeout | `number` | How many milliseconds until the request will timeout. Default value is `20000` ms.|


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
