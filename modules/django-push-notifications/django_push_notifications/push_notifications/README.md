## Django Push Notifications (One Signal) backend configuration and information

## Module description

Push notification are implemented using onSignal. Module allows user to deliver Personalized Customer notifications.

Using this module user will be able to:

- Sends notifications to your users
- Stop a scheduled or currently outgoing notification
- View the details of all of your current OneSignal apps
- View the details of a single OneSignal app
- Creates a new OneSignal app
- Updates the name or configuration settings of an existing OneSignal app
- View the details of multiple devices in one of your OneSignal apps
- View the details of an existing device in one of your OneSignal apps
- Register a new device to one of your OneSignal apps
- Update an existing device in one of your OneSignal apps
- Update an existing device's tags in one of your OneSignal apps using the
- Update a device's session information
- Track a new purchase in your app
- Generate a compressed CSV export of all of your current user data
- View the details of a single notification and outcomes associated with it
- View the details of multiple notifications
- View the devices sent a message - OneSignal Paid Plan Required
- Create segments visible and usable in the dashboard and API - Required:  OneSignal Paid Plan Required
- Delete segments (not user devices) - Required: OneSignal Paid Plan
- View the details of all the outcomes associated with your app

## Features

- [ ] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

Create the `One signal` account by the following steps:

- Sign in to [oneSignal](https://onesignal.com/).
- Create new app by clicking `New App/Website` button.
- Enter the name of your app and select web push or mobile push.
- Click `Configure your Platform` button.
- Enter the `Firebase Server Key` and `Sender ID` and click `Save and Continue` button.
- Select the type of your sdk and click `Save and Continue` button.
- Copy the app id and click `Done` button.
- Click on `Settings` tab in menubar.
- Select `Keys & IDs` tab and copy `OneSignal App ID` and `Rest API Key` save them for later use.
  ![oneSignal](https://user-images.githubusercontent.com/76822297/228469507-71366b43-0ad2-43a5-9924-2723c7a29dd5.png)

## Dependencies

No dependencies are required.

## API details

No API details for this module.
