# Complex Table Module

This module provides a table with search and sorting functionality. Content of the table can be sorted in ascending, descending and alphabetic order. Users can search records in the table by entering a query in the search input.

Features included in the module:
1. Search records in the table
2. Sort the content of the table in ascending order
3. Sort the content of the table in descending order
4. Sort the content of the table in ascending alphabetically

## Features

- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [x] This module can be configured with module options.
- [ ] This module requires manual Android setup.
- [ ] This module requires manual iOS setup.


## Dependencies

Dependencies used:
- [react-native-dropdown-picker](https://www.npmjs.com/package/react-native-dropdown-picker)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)

## Module Options

### Local Configs

Update the values of `header` and `tableData` in `modules/complex-table/options.js`.
```
const header = ["No.", "Name", "Gender"]; // Header column names

const tableData = [ // Data to be displayed in the table
(...)
```
