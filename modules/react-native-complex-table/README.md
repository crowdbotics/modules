# Complex Table Module

Module has a table with search and sorting functionality. COntent of the table can be sorted in ascending, descending and alphabetic order. User can search the record of of the table by entering query in search input.

## Features
1. Search records in the table
2. Sort the content of the table in ascending order
3. Sort the content of the table in descending order
4. Sort the content of the table in ascending alphabetically

## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's `package.json` file.
```
   "react-native-dropdown-picker": "^5.4.4",
   "react-hook-form": "^7.43.2"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import ComplexTable from "@modules/complex-table";

const { title, navigator } = ComplexTable;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from "@modules";
const ComplexTable = modules[module_index].value.navigator; //module_index : position of the module in modules folder
<ComplexTable />;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
