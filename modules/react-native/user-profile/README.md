# User Profile

The user Profile Screen is a React Native-based screen that allows the user to view other users' profiles and edit its own profile information.

## Requirements

For this module to be fully functional, we recommend first installing and configuring the `Basic Login Signup` module available in the storyboard's list of verified modules.

## Installation

After you have added the screen module into your project, you will need to configure a few items by modifying the project files in the github repository. Please note to replace ####### with the numeric sequence for your screen (found in folder name under /src/features) and also that the @BluePrint tags for ImportInsertion and NavigationInsertion will be removed in future so placement is with other imports and inside the AppNavigator above other screens.

### STEP 1: Check if your project has the necessary dependencies

The `react-native-elements` and `react-native-datepicker` dependencies are already available in all newly created mobile apps within Crowdbotics platform. However, make sure to double check if they exist in the `package.json` file at the root folder of your project directory. If they are not available, open this file (`package.json`) and add the dependency after the dependencies opening line "_"dependencies": {_. It should look like this:

```js
"dependencies": {
  "react-native-elements": "^2.3.2",
  "react-native-datepicker": "^1.7.2",
```

### STEP 2: Add screen into your project screen navigation.

#### Edit File /src/navigator/mainNavigator.js:

**ADD** immediately below in the section labeled //@BlueprintImportInsertion:

```js
import UserProfileNavigator from "../features/UserProfile#######/navigator";
```

**ADD** immediately below in the section inside AppNavigator definition labeled //@BlueprintNavigationInsertion section:

```js
UserProfile: { screen: UserProfileNavigator },
```

#### Edit File /src/config/installed_blueprints.js:

Open the file and add below the comment message `// access route is the route nate given to navigator`:

```js
{ name: 'UserProfile#######', human_name: 'User Profile', access_route: 'UserProfile' },
```

You can define the `human_name` for any text that you desire it to display in the side menu.

### STEP 3: Add reducers to store.

**/src/store/index.js**
**ADD** after Line 4 (sagas import):

```js
import {
  userRootSaga,
  userReducer,
} from "../features/UserProfile#######/store";
```

Update your `createStore` code to include the `userReducer`. For example, if your store looks like this:

```js
const store = createStore(
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    authReducer: authReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);
```

You should add the `userReducer: userReducer` after the authReducer, and it should then look like this:

```js
const store = createStore(
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    authReducer: authReducer,
    userReducer: userReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);
```

Near the end of the file, before the `export { store }` line, register the new sagas `sagaMiddleware` like this:

```js
sagaMiddleware.run(userRootSaga);
```

Open your "../features/UserProfile#######/store/services.js" file check if you need to update your back-end api url at `baseURL`. By default, we use the url defined in the file `src/config/app.js`. If you rename your or use custom domains, you might need to replace that value with the proper back-end url, something like:
`baseURL: "https://mycustomdomain.com"`

### Step 4: Update Data Models

Go to your Crowdbotics' app dashboard and navigate to the `Data Models` page. You will see a `User` model. Click on the user model, then click on `Edit Selected` to update the user model and edit the following:

1. Check the box for `API` and add the following fields:

- `first_name`: type as `CharField`
- `last_name`: type as `CharField`
- `birth_date`: type as `DateField`
- `bio`: type as `CharField`

In the end, your data model should look like this:

![model builder](https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/Screenshot_from_2021-01-05_16-05-28.png)

After all the changes, click `save` for all the changes to be applied to your project.

[Visit our knowledge base](https://knowledge.crowdbotics.com/what-is-the-model-editor-and-what-is-it-for) if you need help understanding Data Models.

## Module Usage

There are two ways of using this module. First, is as a logged user profile page, where the user can view, edit and update their profile information. This module will behave like this by default.

The second use case is for displaying **other** users' information. For example, if you have a screen that lists all the users available in the platform, and when you click in a user name, you would like the hability to view that specific user details. For that, you need to add a navigation to the User Profile screen, and pass the user id as a parameter in the navigation call. In the code example below, whenever the button is clicked, it will navigate to the User profile screen and load the information of the user which their id equals to `123`.

```js
<Button
  title="Go to User Profile"
  onPress={() => this.props.navigation.navigate("UserProfile", { id: 123 })}
/>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
