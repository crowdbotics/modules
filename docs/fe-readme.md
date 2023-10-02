# Module Name

## Module description

Enter a module description here.

Include module's main features here and describe them.

Include preview screenshots or videos here.

## ## Features

[ ] This module includes environment variables.
[ ] This module requires manual configurations.
[ ] This module can be configured with module options.
[ ] This module requires manual Android setup.
[ ] This module requires manual iOS setup.

## ## 3rd party setup

Create account...

Include screenshots if possible here.

## Dependencies

Link to the READMEs of the packages that you used in this module.

Dependencies used:
- package-name and link to the package

## ## Module Options

### Global Configs

Update the ``options/options.js`` file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this:
```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

Update the value of the option in `module/{{cookiecutter.project_slug}}`:

const text = "I understand ...";

### Android setup

Update your `android/app/build.gradle` file:
```
```
Update your `android/app/src/main/AndroidManifest.xml` file:


### iOS setup

Update your `ios/{{cookiecutter.project_slug}}/Info.plist` file:
