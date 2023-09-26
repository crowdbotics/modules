# Flag User Content React native specs

## Module description

This is a react native based module which allows user to report a specific post with reason and block the post owner.

- Report post with pre-defined reason.
- Report post with other reason.
- Block post owner.
- View reported items

Include preview screenshots or videos here.

## ## Features

- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [x] This module can be configured with module options.
- [ ] This module requires manual Android setup.
- [ ] This module requires manual iOS setup.

## ## 3rd party setup

No 3rd party account creation required.

## Dependencies

No dependencies used.

## ## Module Options

### Global Configs

Update the `options/options.js` file with your app's backend url.

```js
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

### Local Configs

Update the value of the option in `options.js`:

```js
const POST_ID = 0;
const USER_ID = 0;
const IMAGE_LINK = "";
const POST_TITLE = "";
const ACCESS_TOKEN = "";
const BASE_URL = "";
```

### Android setup

No android setup required.

### iOS setup

No iOS setup required.
