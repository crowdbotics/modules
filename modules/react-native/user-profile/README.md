# User Profile

The user Profile Screen is a React Native-based screen that allows the user to view other users' profiles and edit its own profile information.

## Requirements

For this module to be fully functional, we recommend first installing and configuring the `Login` or `Social Login` modules available in the storyboard's list of verified modules.

### Update the file modules/user-profile/store/api.js

Update this file by replacing the `SERVICE_URL` url value with your apps' own backend url. For example, for a Crowdbotics app deployed at `https://my-app.botics.co/`, the change would look like:

```js
SERVICE_URL = "https://my-app.botics.co/";
```

### Update Data Models

Go to your Crowdbotics' app dashboard and navigate to the `Data Models` page. You will see a `User` model. Click on the user model, then click on `Edit Selected` to update the user model and edit the following:

1. Check the box for `API` and add the following fields:

- `first_name`: type as `CharField`
- `last_name`: type as `CharField`
- `bio`: type as `CharField`

In the end, your data model should look like this:

![model builder](https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/Screenshot_from_2021-01-05_16-05-28.png)

After all the changes, click `save` for all the changes to be applied to your project.

If you choose, you can add other fields to the user model, just make sure to update this module so the new fields are rendered correctly.

[Visit our knowledge base](https://knowledge.crowdbotics.com/what-is-the-model-editor-and-what-is-it-for) if you need help understanding Data Models.

## Module Usage

There are two ways of using this module. First, as a logged in user profile page, where the user can view, edit and update their profile information. This module will behave like this by default (you must be logged in using one of the login modules available). If you use a custom login method and reducer store, you might need to edit the code in `useSelector` for both `index.js` and `edit.js` files to match where both the `state.login.user` and user `state.login.token` is stored at.

The second use case is for displaying **other** users' information. For example, if you have a screen that lists all the users available in the platform, and when you click in a user name, you would like to view that specific user details. For that, you need to add a navigation to the User Profile screen, and pass the user id as a parameter in the navigation call. In the code example below, whenever the button is clicked, it will navigate to the User Profile screen and load the information of the user which their id equals to `123`.

```js
<Button
  title="Go to User Profile"
  onPress={() => navigation.navigate("userProfile", { id: 123 })}
/>
```

## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import UserProfile from "@modules/user-profile";

const { title, navigator, slice } = UserProfile;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
