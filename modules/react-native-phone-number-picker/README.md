# Phone Number Picker Module
Module allows user to select the country code and enter the country phone number. 

## Scope Features
The key features in scope for this module is that it has ability to select country code of any phone number.

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript

import PhoneNumberPicker from "@modules/phone-number-picker";

const { title, navigator } = PhoneNumberPicker;

```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript

import { modules } from '@modules';

const PhoneNumberPicker = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<PhoneNumberPicker  />

```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
