## Ticket

PLAT-XXXX
_Related tickets:_
_Related PRs:_

## Type of PR

- [ ] Bugfix
- [ ] New feature
- [ ] Minor changes

## Running the demo

In order to run the included demo app, run `yarn run bootstrap` and then `cd demo` and run both `npx react-native run-android` and `npx react-native start` in parallel.

## Review checklist for new or updated modules

[ ] I have made no modules changes - ignore this section questions in that case
[ ] I have included a `meta.json` file in the module's root directory
[ ] I have included a `preview.png` image in the module's root directory
[ ] `yarn run parse` checks pass
[ ] I updated the modules build (`/dist` directory) with `yarn run parse --write`
[ ] `yarn run demo` and `yarn run add app-menu <your-module>` runs correctly
[ ] **"Running the demo"** app shows the App Menu screen with an entry for your module
[ ] Clicking your module entry in the menu loads your module's initial screen correctly

## Review checklist for scaffold changes

[ ] I have made no scaffold changes - ignore this section questions in that case
[ ] `yarn run template` produces no changes
[ ] `yarn run raw && yarn run cookie` produces no changes, except for `yarn.lock`
[ ] `yarn run demo` finishes successfully, `demo` directory gets created locally
[ ] **"Running the demo"** opens the app correctly in the welcome screen

## Changes introduced

_Describe the changes being introduced in this PR_
_Include screenshots if necessary_
_Please link any documentation reference that relate to the changes_

## Test and review

_Describe how a reviewer should test your PR_
