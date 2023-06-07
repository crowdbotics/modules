# Signature 
Signature module is React Native based module allows user to create signature. 

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
## Features

## In app signature
User is able to sign on the canvas

