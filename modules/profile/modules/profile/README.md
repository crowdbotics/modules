# Profile Module
The Profile Module is a React Native based Module, module allows the user to view, delete and edit its own profile information.

## Scope Features
The following are the key features in scope for this module. 
1. Ability to create and update the user profile with details.
2. Ability to get the specific profile details.
3. Ability to delete the profile.

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` and `x-dependencies` section and past them in your project's main `package.json` file.
Here are the required packages for the module:
```
    "react-native-document-picker": "8.1.3"
```
and run this command.
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api/index.js` file.

* **updateProfile**
`addProfile` method used to update the profile details.

* **getProfile**
`getProfile` method is used return a specific user profile details.

* **deleteProfile**
`deleteProfile` method used to delete the profile details.

## Manual Setup
1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Profile from "@modules/profile";

const { title, navigator } = Profile;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';
const Profile = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Profile />;
```
## Local Configs
in modules/profile/options.js you can update following options:

```javascript

const userToken = "";


```
## View responses
User can view responses

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
