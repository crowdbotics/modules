# Splash Screen

The Splash Screen is a React Native based splash screen, by that means, it truly isn't executed until after the app
is fully loaded. If it's desired to appear during load, you will need to build a native screen in both Android and iOS directories of the project.

## Installation

After you have added the screen module into your project, you will need to configure a few items by modifying the project files in the github repository. Please note to replace ####### with the numeric sequence for your screen (found in folder name under /src/features) and also that the @BluePrint tags for ImportInsertion and NavigationInsertion will be removed in future so placement is with other imports and inside the AppNavigator above other screens.

### Step 1: Add screen into your project screen navigation and set splash screen as initial routed screen.

**/src/mainNavigator.js:**
**ADD** immediately below in the section labeled //@BlueprintImportInsertion:

`import SplashScreenNavigator from '../features/SplashScreen#######/navigator';`

**ADD** immediately below in the section inside AppNavigator definition labeled //@BlueprintNavigationInsertion section:

`SplashScreen#######: { screen: SplashScreenNavigator },`

**ADD** comma after **contentComponent: Sidemenu**, and initialRoutName so that your code looks like:

```
const DrawerAppNavigator = createDrawerNavigator(
    {
        ...AppNavigator,
    },
    {
        contentComponent: SideMenu,
        initialRouteName: "SplashScreen#######", // Splash Screen
    },
);
```

### STEP 2: Change the redirect screen for splash to your desired screen (likely home or onboarding screens).

**MODIFY** screen `/src/features/SplashScreen#####/index.js` file and update the value of `NEXT_SCREEN_NAME` with your desired destination screen - likely home or onboarding screens:

### STEP (OPTIONAL): Changing time for splash screen.

The time set in the screen is set for 3000 ms or 3 seconds. To change this, change the number in the `setTimeout` function to the desired number, in miliseconds:

```js
setTimeout(() => {
    navigation.navigate(NEXT_SCREEN_NAME);
}, 3000) // <- Update here
```

### Step: (OPTIONAL): Update project to include your screen in the sidemenu navigation list.

**/src/config/installed_blueprints.js:**
Make sure any screens that aren’t desired in the side menu are removed from the file. This list should only contain the screens desired to be linked on the side menu hamburger. Every screen that you want to show in the sidemenu should be added as follows:

`{ name: 'SplashScreen#######', human_name: 'Splash Screen’, access_route: 'SplashScreen#######'}`

**name:** doesn't matter much, its used as a unique key for the side menu and splash screens array of
buttons, it must be unique, that's the only requirement

**human_name:** is what will be displayed in actual app

**access_route:** must be the name of the key in your mainNavigator setup
