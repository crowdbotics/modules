# Commands

## Table of Contents

- [Generate modules data](#generate-modules-data)
- [Get module info](#get-module-info)
- [Create a local demo app](#create-a-local-demo-app)
- [Install a module](#install-a-module)
- [Remove a module](#remove-a-module)
- [Generate cookiecutter](#generate-cookiecutter)

## Generate modules data

```sh
npm run parse
```

Run the command to generate the JSON data, ready to be pasted in the Crowdbotic's Admin page for updates or new modules creation.

In our `crowdbotics-slack-app` backend we support two flags on each file:

- `parentDir` - default to `src/features/<module_name>` if null, or use it otherwise
- `newFile` - undocumented/unimplemented?

### Create records in the admin panel

- [Staging Admin](https://crowdbotics-slack-dev.herokuapp.com/admin)
- [Production Admin](https://app.crowdbotics.com/admin)

### Use the following Component field values

**App Types:**

```text
3
```

Check **Auto build** and **Is screen**.

**Options:**

```json
{ "x": 0, "y": 0, "domTree": "" }
```

**Code:**
Copy from:

- [modules.json](/dist/modules.json)

**Setup step:**

```text
To properly configure this module, follow the instructions given in README.md inside the module folder.
```

## Get module info

```sh
npm run info <module_type> <module_name>
```

Prints the module name, description and the respective data JSON.

Supported module types:

- "django"
- "react-native"

## Create a local demo app

```sh
npm run demo
```

This command runs `npx react-native init` with [`--template`](https://github.com/react-native-community/cli/tree/master/packages/global-cli#--template) pointing to our own [Custom React Native template](#custom-react-native-template).

## Install a module

```sh
npm run add <module_name> <supports_multiple_modules_syntax>
```

Installs a module into the demo app, performing the follow operations:

1. Copies the module directory from [react-native](/modules/react-native) into `demo/modules`.
2. Runs `yarn add <module_name>` in the `demo` directory.
3. Runs `yarn add <dependency>` for every `x-dependencies` in the module `package.json`.

## Remove a module

```sh
npm run remove <module_name> <supports_multiple_modules_syntax>
```

Removes a module from the demo app, performing the follow operations:

1. Removes the module folder from `demo/modules`.
2. Runs `yarn remove <module_name>` in the `demo` directory.
3. Runs `yarn remove <dependency>` for every `x-dependencies` in the module `package.json`.

### Generate cookiecutter

Start by generating a new app called ProjectName to serve as input for cookiecutter replacements:

```sh
npm run raw

```

Then run the cookie command to generate distribution cookiecutter.

```sh
npm run cookie
```

Generates cookiecutter template by replacing according to table:

| Before                     | After                                    | Example            |
| -------------------------- | ---------------------------------------- | ------------------ |
| `ProjectName`              | `{{ cookiecutter.project_slug }}`        | `MyNewApp`         |
| `projectname`              | `{{ cookiecutter.project_dash_slug }}`   | `mynewapp`         |
| `ProjectNameIdentifier`    | `{{ cookiecutter.project_dash_slug }}`   | `mynewapp`         |
| `ProjectOwnerEmail`        | `{{ cookiecutter.owner_email }}`         | `mail@example.com` |
| `ProjectSSHKeyFingerPrint` | `{{ cookiecutter.ssh_key_fingerprint }}` | `abc:123`          |

Ouput will be made to [dist/cookie](/dist/cookie).
