# Signature 
Signature module is React Native based module allows user to create signature. 


## Features

### In app signature
User is able to sign on the canvas 

### upload sigature
User is able to upload signature to database

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` section and past them in your project's main `package.json` file, and run this command.
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api/index.js` file.

* **saveSignature**
`saveSignature` method takes an object containing `image`, and upload to database.




## Manual Setup
If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Signature from "@modules/signature";
const { title, navigator } = Signature;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Signature = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Signature  />
```

## Global Configs
### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## local Configs
Update text in modules/signature/options.js

```
const text = "I understand ...";
```





### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)

