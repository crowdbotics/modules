# Appointment local
Appointment local module will enable new appointments to be created and saved locally on a database


## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Appointment from "@modules/appointment-local";
const { title, navigator } = Appointment;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Appointment = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Appointment  />
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

## Features

# Create appointment
User can create an appointment

# Delete appointment
User can delete an appointment

# View list of appointments
user can view list of appointments

# Seach an appointment
User can search appointments
