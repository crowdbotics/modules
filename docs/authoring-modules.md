# Authoring Modules

## Table of contents

- [Guidelines](#guidelines)
- [package.json](#packagejson)
- [Adding dependencies to your module](#adding-dependencies-to-your-module)
- [Adding dependencies with Native code](#adding-dependencies-with-native-code)
- [Running code on app load](#running-code-on-app-load)
- [Modules Options](#modules-options)
- [Screen modules](#screen-modules)
- [Django modules](#django-modules)

## Guidelines

Modern React Native components guidelines:

- Prefer function components over class components
- Prefer React Hooks over React.component APIs
- Prefer react-redux Hooks over connect HOC
- Prefer redux-toolkit over custom redux logic setups
- Prefer redux-thunk over redux-saga
- Prefer pure components

Run pre-configured ESLint on your module with:

```
yarn run eslint modules/<your-module>
```

## package.json

Your module's `main` key should always point to `index.js`. We also suggest that you name your module with a namespace prefix `@modules` like in the example below.

Your module can include its own dependencies, more on that in the following sections.

[react-native/maps/package.json](https://github.com/crowdbotics/modules/blob/master/modules/react-native/maps/package.json)

```json
{
  "name": "@modules/maps",
  "version": "1.0.0",
  "description": "## Setup",
  "private": true,
  "main": "index.js",
  "dependencies": {},
  "x-dependencies": {
    "react-native-maps": "0.27.1"
  },
  "author": "Crowdbotics"
}
```

There's a strict requirement on the format of your default export on your module's `index.js` file.

It should look like this:

```javascript
export default {
  title: "Maps", // required
  navigator: Maps, // optional
  slice: MapsSlice // optional
};
```

Or like this:

```javascript
export default {
  title: "Maps", // required
  navigator: Maps, // optional
  slice: {
    reducer: MapsReducer, // optional
    actions: [...MapsActions] // optional
  }
};
```

The key `title` is required, everything else is optional and can be ommited.
We use this format to "auto-import" every module into the app automatically.

We also support plain exports:

```javascript
export default MapsNavigator;
```

Which would be converted into this object:

```javascript
export default {
  title: "MapsNavigator",
  navigator: MapsNavigator
};
```

## Adding dependencies to your module

If you want to include libraries that your module depends upon and imports from, just include those as regular dependencies in the `package.json`.

```sh
npm install <dependency> -- save
```

Whenever the module gets the installed the dependencies of your module get installed in the app via npm's sub-dependencies.

If your library includes native code or depends on the [React Native's autolinking](https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/docs/autolinking.md) feature please read the section below too.

## Adding dependencies with Native code

[React Native's autolinking](https://github.com/react-native-community/cli/blob/641b21f583c97e3d48ce87d5fe804f42db92fa5c/docs/autolinking.md) doesn't work yet with NPM's sub-dependencies.

Example, including `react-native-maps` in the maps module will not link the native
modules properly and results in

```
[Sat Jan 16 2021 16:23:45.446]  ERROR    Invariant Violation: requireNativeComponent: "AIRMap" was not found in the UIManager.
```

https://github.com/react-native-community/cli/issues/1347
https://github.com/react-native-maps/react-native-maps/issues/3427#issuecomment-627135604

In order to include `react-native-maps` in your module, simply move the dependency from "dependencies" to "x-dependencies" in your module's `package.json`. Those will be installed alongside the app's "dependencies" avoiding the limitation above.

## Running code on app load

Multiple scenarios and libraries require you to wrap your screen or other components (even your root component) to create context providers or to run initialization code.

Our auto-loading setup allows you to author a custom React hook on your module that gets automatically called in the app's root component.

In other words, any code that you would write inside your root component `componentDidMount` function can be instead written as a custom Hook.

To write the custom hook, please check the React documentation:
https://reactjs.org/docs/hooks-custom.html

And then export the hook in the module default export like below:

```javascript
const useOneSignal = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // ...
  });

  return someState;
};
export default {
  title: "Push Notifications",
  hook: useOneSignal
};
```

The example above is for an headless module (no screens), but you can export hooks in regular modules too.

## Modules Options

Your module can include an options file that exports a JSON object that you can reuse on your module source code.

Those options are then automatically provided from a React Native context:

```javascript
import React, { useContext } from "react";
import { OptionsContext, GlobalOptionsContext } from "@options";

function YourModuleComponent() {
  // Consume module's own options in this component
  const options = useContext(OptionsContext);

  // Consume app's global options in this component
  const global = useContext(GlobalContext);

  return (
  )
}
```

One can also obtain options in a more direct manner, for use outside of components. The drawback with this method is that you miss reactivity if any option value were to change.

```javascript
import pkg from "./package.json"
import { getOptions, getGlobalOptions } from "@options";

function YourModuleComponent() {
  // ...
  return (

  )
}

const options = getOptions(pkg.name);
const global = getGlobalOptions();
```

### Writing your options file

This is an example of an [options file](https://github.com/crowdbotics/modules/blob/master/modules/react-native-app-menu/options.js) for our App Menu module:

```javascript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    color: "black",
    fontSize: 20
  },
  buttonPressed: {
    backgroundColor: "aquamarine"
  },
  buttonNotPressed: {
    backgroundColor: "blue"
  },
  button: {
    borderRadius: 4,
    padding: 15,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
});

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles
};
```

Its worth noting that the options file must `export default` a valid JSON object.

Styles rules values can only be literal numbers or strings, no variable references allowed.

## Screen Modules

Screen modules are client only modules that depend on `react` and `react-native` libraries exclusively, and are compatible with the initial release of Studio.

Those require a `meta.json` root property that points to the screens directory, i.e:

```json
{
  "title": "Login Screen",
  "description": "Login screen",
  "root": "/screens/login"
}
```

Similar to modules, those screens point to a main file `index.js`. Notice how the name of the modules starts with `@screens` instead.

```json
{
  "name": "@screens/login",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "main": "index.js",
  "files": ["*"],
  "author": "Crowdbotics",
  "license": "ISC"
}
```

Finally, this type of modules should include a default export in the main file (`index.js`) - this will be automatically picked up by the [Autoloading](autoloading.md) mechanism:

```
export default LoginScreen;
```

## Django Modules

Django modules are encapsulated in a Python package in order to resolve dependencies. As such, they must have the following structure:

```
django-articles  # Module Slug
├── django_articles  # Python Package dir
│  ├── articles  # Package content
│  │  ├── admin.py
│  │  ├── apps.py  # Django Application file
│  |  ├── __init__.py
│  │  ├── migrations
│  │  │  ├── 0001_articles_initial.py
│  │  │  └── __init__.py
│  │  ├── models.py
│  │  ├── options.py  # Module's Options
│  │  ├── README.md
│  │  ├── serializers.py
│  │  ├── urls.py
│  │  └── viewsets.py
│  ├── pyproject.toml  # Python Package file
│  └── setup.py  # Python Package definition
├── meta.json  # Module's meta.json
└── preview.png  # Preview Image

```

The Python Package dir (`django_articles`) must reside in the `/backend/modules` directory of the Crowdbotics application. In the case of a stand-alone Django module, this can be specified in the Module's meta.json in the `root` key, whether in the mixed modules (those with RN code) the path must be created.

### The Python Package directory

This is a regular Python Package that will be installed in editable mode in order to resolve dependencies. An `egg` directory will be generated on install which should be ignored.

The file strictly required is `setup.py` which has the following structure:

```python
from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_articles",  # Python Package name
    version="0.1",
    packages=["articles"],  # Directory with the Package content
    install_requires=[],  # Dependencies to be installed
    cmdclass={"build": BuildCommand},
)
```

The Python Package name is namespaced to `cb` to avoid eventual clashes, and should be start with `cb_`, followd by the name of the python package directory (`django_articles` in this case). As this may be imported from other parts of the application, you should avoid using dots and dashes, as it prevents regular imports.

The directory with the package content is where the actual code of the module resides - this level of the structure is only for packaging.

Dependencies to be installed must be listed in the `install_requires` arg in the regular Python dependencies format, i.e. if the module requires just `Pillow`, `Django` 4 or greater and a pinned package, then:

```python
install_requires=["Pillow", "Django>=4", "somepackage==3.3.3"]
```

The custom `BuildCommand` should also be included as the building files may interfere with the discovery process of the module.

At this time, `pyproject.toml` only contains the backend specification and should be included for the future.

### The Python Package Content

This is where the Module's actual code resides and should be a valid Django app, containing the corresponding `apps.py`, i.e.

```python
from django.apps import AppConfig


class ArticlesConfig(AppConfig):
    name = "modules.django_articles.articles"  # Python path to app
    verbose_name = "Articles"
```

Having this, migrations should run, the admin will be included and urls will be hooked under `modules/<package-content-directory>/`.

An options file may be present at the app's root, i.e. `/backend/modules/django_articles/articles/options.py`:

```python
RECORDS_PER_PAGE = 50
MEDIA_UPLOAD_PATH = "mediafiles/articles/"
```

which can be accessed programatically by using `modules.utils.get_options()`, i.e.

```
from modules.utils import get_options

MEDIA_UPLOAD_PATH = get_options("django_articles", "MEDIA_UPLOAD_PATH")
```

Note that for this to work correctly - users set the value via the front-end of Crowdbotics main app - the request for the module must be done by its slug, `django-articles` in this case - not `django_articles` (the python package directory) nor `articles` ("content-directory" of the package), as the options set by the users generated by the back-end of the main Crowdbotics app uses that key.
