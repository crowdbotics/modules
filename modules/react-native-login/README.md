# Login Module
The Login Module is a React Native-based module that allows the user to login or signup within their app.

## Installation

#### Update api url in options/options.js

The Login Module connects to an existing Crowdbotics Django backend, so you must have one already deployed. Once you have a backend deployed, to connect the module to your backend, modify the `url` in your global options folder, which is located at `my-app/options/options.js`. Note that this is not the same as the `options.js` file located within the login folder -- that is for your specific Login Module options.

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
  {}
```

Note for developers: you can access the user token through the reducer state (i.e. `state.login.token` and user auth information like email at `state.login.user`)

### Change Login screen destination to your desired screen (likely Home screen).
After a successful login, you can route the user to whichever screen you like. To set the screen to redirect to, open the module options file for the Login Module -- `modules/login/options.js`. Note this is a different options folder than you used to set the url as it is nested within the Login Module. Inside this file, change the `HOME_SCREEN_NAME` value to the string of the screen you want to redirect to.

For example, if my home screen has a navigation name of `HomeScreen1234`, then I should change as follows: `const HOME_SCREEN_NAME = 'HomeScreen1234'`. 

### Additional Configuration via Module Options

Module Options allow you to configure additional parts of your onboarding frontend.

If you desire, you can also update your logo and background image URL (be mindful that the size of the image should match the original ones for ideal results) from `modules/login/options.js`. You can also set up custom text for the two sign in/up buttons and navigation tabs by editing the appropriate values - SignInNavText,SignUpNavText, SignInButtonText, SignUpButtonText.



. Finally, if you would like to change the email validation logic, you can modify the regex in that same options.js file as well.



## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Login from "@modules/splash";
const { title, navigator } = Login;
```

2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';

const Login = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<Login LOGO_IMAGE={''} BACKGROUND_IMAGE = {''} />;

```

## Params

Below is the list of all params that can be passed to the module.

| Name            | Type       | Description                                                    |
| --------------- |:----------:|:---------------------------------------------------------------|
| LOGO_IMAGE      | `string`   | URL of your logo to be displayed on signIn/signUp page.|
| BACKGROUND_IMAGE| `string` | URL of your background image to be displayed on signIn/signUp page.     |
| logoStyle       | `object` | Set style for for the logo.                   |
| backgroundImgStyle | `object` | Set style for the background image if you have set any.|
| mainContainerStyle | `object`  | Set style for the container wrapping the whole content of the signIn/signUp page.|
| imageContainerStyle| `object`   | Set style for the container containing logo and background image.    |
| signInContainerStyle| `object`   | Set style for the container containing just signin and signup section. |
| textInputStyle  | `object`   | Set custom style for the text inputs.          |
| buttonStyle     | `object`   | Set custom style for the signin and signup buttons.                       |
| buttonTextStyle | `object`   | Set custom style for the signin and signup buttons text. |
| activeTabStyle  | `object`   | Set custom style for active tab on the signIn/signUp page.             |

 
## Old Crowdbotics Scaffold (optional)
If your project does not use the latest version of Crowdbotics scaffold, you might need manually configure this module in order for it to work properly, including:
- Adding the module to the main apps' navigation tree
- Adding the redux-toolkit to your project and loading the proper middleware
- Loading the module's reducer to the store

To verify if your project is on the latest version, look for a `.crowdbotics.json` file at the root of your project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.