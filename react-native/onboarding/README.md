# CB Slide Onboarding Tutorial Screen

The CB Slide Onboarding Tutorial Screen is a ReactNative based onboarding screen. It can be configured to have 1 or many
slide screens with content and expansion detailed in the file.

## Installation

After you have added the screen module into your project, you will need to configure a few items by modifying the project
files in the github repository. Please note to replace ####### with the numeric sequence for your screen (found in folder name under /src/features) and also that the @BluePrint tags for ImportInsertion and NavigationInsertion will be removed in future so placement is with other imports and inside the AppNavigator above other screens.

### STEP 1: Add dependency library to the project.

**/PROJECT_ROOT_DIRECTORY/package.json:**

**ADD** Dependency after Line 16 (dependencies opening line "_"dependencies": {_ ")

`"react-native-app-intro-slider": "^4.0.4", `

### Step 2: Add screen into your project screen navigation.

**/src/mainNavigator.js:**
**ADD** immediately below in the section labeled //@BlueprintImportInsertion:

`import OnboardingSlideScreen#######Navigator from '../features/OnboardingSlideScreen#######/navigator';`

**ADD** immediately below in the section inside AppNavigator definition labeled //@BlueprintNavigationInsertion section:

`OnboardingSlideScreen#######: { screen: OnboardingSlideScreen#######Navigator },`

### STEP (OPTIONAL): do this if you do not have a splash and want the onboarding to load first.

**ADD** comma after **contentComponent: Sidemenu**, and initialRoutName so that your code looks like:

```
const DrawerAppNavigator = createDrawerNavigator(
{
    ...AppNavigator,
    },
    {
        contentComponent: SideMenu,
        initialRouteName: "OnboardingSlideScreen#######", // Onboarding Slide Screen
    },
);
```

### STEP 3: Update the Onboarding Slide Screen content as desired, the navigated screen after done (typically the HOME screen) including the number of slide screens needed.

**/src/features/OnboardingSlideScreen#######/index.js:**

**MODIFY** slides, update with your slides content/desired number of slides:

```
const slides = [
 {
   key: 'one',
   title: 'Title 1',
   text: 'Description.\nSay something cool',
   image: { uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" },
   backgroundColor: '#59b2ab',
 },
 {
   key: 'two',
   title: 'Title 2',
   text: 'Other cool stuff',
   image: { uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" },
   backgroundColor: '#febe29',
 },
 // {
 //   key: 'three',
 //   title: 'Rocket guy',
 //   text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
 //   image: require('./assets/3.jpg'),
 //   backgroundColor: '#22bcb5',
 // }
];
```

**MODIFY** Line 64, Replace LoginSignupScreen177769 with desired destination home/screen:

`this.props.navigation.navigate('LoginSignupScreen177769')`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
