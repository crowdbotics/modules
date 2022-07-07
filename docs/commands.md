# Commands

## Table of Contents

- [Generate modules data](#generate-modules-data)
- [Get module info](#get-module-info)
- [Create a local demo app](#create-a-local-demo-app)
- [Install a module](#install-a-module)
- [Remove a module](#remove-a-module)
- [Generate cookiecutter](#generate-cookiecutter)
- [Bootstrap](#bootstrap)
- [Update React Native base template](#update-react-native-base-template)
- [Lint modules](#lint-modules)

## Generate modules data

```sh
yarn run parse
```

Run the command to validate, parse and export the modules source code into a [JSON file](/dist/modules.json).

Example output:

```shell
~/code/github.com/crowdbotics@modules (hotfix/login-screen-export) $ yarn parse
yarn run v1.22.10
$ node scripts/parse.js

Parsing modules...

✅ camera
✅ django-articles
❌ django-push-notifications => module preview image missing
❌ django-social-auth => module preview image missing
✅ payments
✅ privacy-policy
✅ react-native-app-menu
✅ react-native-articles
✅ react-native-chat
✅ react-native-login
✅ react-native-maps
✅ react-native-onboarding
❌ react-native-push-notifications => module preview image missing
❌ react-native-social-login => module preview image missing
✅ react-native-splash
✅ react-native-user-profile
✅ screen-login
✅ terms-and-conditions

Total of modules: 18
Done in 0.27s.
```

## Get module info

```sh
yarn run info <module_type> <module_name>
```

Prints the module name, description and the respective data JSON.

Supported module types:

- "django"
- "react-native"

## Create a local demo app

```sh
yarn run demo
```

This command runs `npx react-native init` with [`--template`](https://github.com/react-native-community/cli/tree/master/packages/global-cli#--template) pointing to our own [Custom React Native template](#custom-react-native-template).

## Install a module

```sh
yarn run add [<module_name>]
```

Installs a list of modules into the demo app, performing the follow operations:

1. Copies the module directory from [react-native](/modules/react-native) into `demo/modules`.
2. Runs `yarn add <module_name>` in the `demo` directory.
3. Runs `yarn add <dependency>` for every `x-dependencies` in the module `package.json`.

## Remove a module

```sh
yarn run remove [<module_name>]
```

Removes a list of modules from the demo app, performing the follow operations:

1. Removes the module folder from `demo/modules`.
2. Runs `yarn remove <module_name>` in the `demo` directory.
3. Runs `yarn remove <dependency>` for every `x-dependencies` in the module `package.json`.

### Generate cookiecutter

Start by generating a new app called `ProjectName` to serve as input for cookiecutter replacements:

```sh
yarn run raw

```

Then run the cookie command to generate distribution cookiecutter.

```sh
yarn run cookie
```

Generates cookiecutter template by replacing according to the following translation table:

| Before                     | After                                    | Example            |
| -------------------------- | ---------------------------------------- | ------------------ |
| `ProjectName`              | `{{ cookiecutter.project_slug }}`        | `MyNewApp`         |
| `projectname`              | `{{ cookiecutter.project_dash_slug }}`   | `mynewapp`         |
| `ProjectNameIdentifier`    | `{{ cookiecutter.project_dash_slug }}`   | `mynewapp`         |
| `ProjectOwnerEmail`        | `{{ cookiecutter.owner_email }}`         | `mail@example.com` |
| `ProjectSSHKeyFingerPrint` | `{{ cookiecutter.ssh_key_fingerprint }}` | `abc:123`          |

Ouput will be made to [dist/cookie](/dist/cookie).

## Bootstrap

```sh
yarn run bootstrap
```

Runs `demo`, `raw`, `cookie`, and `parse` commands.

## Update React Native base template

```sh
yarn run template
```

Updates the react-native template from upstream, from the locally resolved version (currently pinned to 0.64.2).

## Lint modules

Lint modules source code with a pre-configured ESLint setup:

```
yarn lint
```
