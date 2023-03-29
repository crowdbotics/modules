# Django Push Notifications
Push notification are implemented using onSignal. Module allows user to deliver Personalized Customer notifications.

## Features
Using this module user will be able to:
1. Sends notifications to your users
2. Stop a scheduled or currently outgoing notification
3. View the details of all of your current OneSignal apps
4. View the details of a single OneSignal app
5. Creates a new OneSignal app
6. Updates the name or configuration settings of an existing OneSignal app
7. View the details of multiple devices in one of your OneSignal apps
8. View the details of an existing device in one of your OneSignal apps
9. Register a new device to one of your OneSignal apps
10. Update an existing device in one of your OneSignal apps
11. Update an existing device's tags in one of your OneSignal apps using the
12. Update a device's session information
13. Track a new purchase in your app
14. Generate a compressed CSV export of all of your current user data
15. View the details of a single notification and outcomes associated with it
16. View the details of multiple notifications
17. View the devices sent a message - OneSignal Paid Plan Required
18. Create segments visible and usable in the dashboard and API - Required:  OneSignal Paid Plan Required
19. Delete segments (not user devices) - Required: OneSignal Paid Plan
20. View the details of all the outcomes associated with your app


## oneSignal Account
1. Sign in to [oneSignal](https://onesignal.com/).
2. Create new app by clicking `New App/Website` button.
3. Enter the name of your app and select web push or mobile push.
4. Click `Configure your Platform` button.
5. Enter the `Firebase Server Key` and `Sender ID` and click `Save and Continue` button.
6. Select the type of your sdk and click `Save and Continue` button.
7. Copy the app id and click `Done` button.
8. Click on `Settings` tab in menubar.
9. Select `Keys & IDs` tab and copy `OneSignal App ID` and `Rest API Key` save them for later use.

![oneSignal](https://user-images.githubusercontent.com/76822297/228469507-71366b43-0ad2-43a5-9924-2723c7a29dd5.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
