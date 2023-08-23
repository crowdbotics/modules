# Complex Table Module

Module has a table with search and sorting functionality.

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
