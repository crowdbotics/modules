# Login Module
The Login Module is a React Native-based module that allows the user to login or signup within their app.

## Installation

#### Update api url

Update the file `<module_directory>/auth/api.js`, replacing the value of `baseURL` with your own app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, update from
`baseURL: "https://your-app-backend.botics.co"` to `baseURL: "https://my-app.botics.co"`

Note for developers: you can access the user token through the reducer state (i.e. `state.login.token` and user auth information like email at `state.login.user`)

### Change Login screen destination to your desired screen (likely Home screen).

Open the `screens/constants.js` file and edit the `HOME_SCREEN_NAME` value with desired destination screen (likely Home Screen). For example, if my home screen has a navigation name of `HomeScreen1234`, then I should change as follows: `export const HOME_SCREEN_NAME = 'HomeScreen1234'`. If you desire, you can also update your logo image URL (be mindful that the size of the image should match the original ones for ideal results).


## Modify backend (optional)
The configuration steps below will allow your app to send emails like verification email and password reset emails. 
If your app's backend does not have SENDGRID environmental variables available, _make changes to project backend files (in /backend/YOUR_PROJECT folder):_

**MODIFY: /backend/YOUR_PROJECT_NAME/settings.py** version in your project backend folder

**ADD** above AWS S3 Config lines:

```sh
EMAIL_HOST = env.str("EMAIL_HOST", "smtp.sendgrid.net")
EMAIL_HOST_USER = env.str("SENDGRID_USERNAME", "")
EMAIL_HOST_PASSWORD = env.str("SENDGRID_PASSWORD", "")
```

If this code already exists, you can just skip this step.

### Setup SendGrid account and keep reference to username and password.

Reference website [Sendgrid](https://wwww.sendgrid.com)

### Configure Environment Variables.

Using the Crowdbotics Dashboard, navigate to "Settings" and select the tab "Environment Variables", here you will add the following variables:

```
SENDGRID_USERNAME
SENDGRID_PASSWORD
```

## Old Crowdbotics Scaffold (optional)
If your project does not use the latest version of Crowdbotics scaffold, you might need manually configure this module in order for it to work properly, including:
- Adding the module to the main apps' navigation tree
- Adding the redux-toolkit to your project and loading the proper middleware
- Loading the module's reducer to the store

To verify if your project is on the latest version, look for a `.crowdbotics.json` file at the root of your project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.