# MailChimp

The module allow user to build custom features related to campaign, members, manage segments and target audiences and templates.

## Scope Features
The following are the critical features in scope for this module.
1. Create a new campaign folder.
2. Get & Update information about a specific folder used to organize campaigns.
3. Give all campaigns in an account
4. Create a new Mailchimp campaign.
5. Add a new store to the user's Mailchimp account.
6. Give information about all lists in the account.
7. Give information about members in a specific Mailchimp list.
8. Give information about list members who unsubscribed from a specific campaign.
9. Give all folders used to organize templates.

## Required SDKs and Libraries
A 3rd party integration requirements which is:
-  [mailchimp-marketing](https://pypi.org/project/mailchimp-marketing/)

Can be install by following command:
- pip install mailchimp-marketing

And add this package in `pipfile`
```
mailchimp-marketing=3.0.80"
```
This SDK is provided as open source, which enables you to customize its functionality to suit your particular use case.

## Keys And Credientials Setup
You can get environment variable (MailChimp API Keys & credientials) by the following steps:
1. Create  MailChimp Developer account.
2. Activate Mailchimp Account from the mail sent to user's provided email.
3. Once the developer account is successfully created open the MailChimp Dashboard > On Lower Left corner of Side Bar Click on 'User Profile' Logo.
4. Click 'Profile'.
5. Click 'Extras' > Click 'API keys'. > Scroll the page down > Click 'Create A Key'.
![screenshot-us21 admin mailchimp com-2023 03 24-14_48_30](https://user-images.githubusercontent.com/120275623/227486815-2987705e-3dd4-4b22-bf65-c4cf95a9920b.png)


## Environment variables

```
MAILCHIMP_API_KEY=""
MAILCHIMP_SERVER_REGION=""
```

## Setup Installation
To install the given dependencies in `setup.py`. Go to the `modules/django-mailchimp/mailchimp/` and run the following command:
```
python -m pip install .
```
Start the server by running the following command :
```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                                                          |                        Param                        | Description                                                                                                                                                                                                                            |
|-----------------------------------------------------------------------------------|:---------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/mailchimp/audience/{id}/add-list-member/ `                              |                    Url `list_id`                    | Add a new member to the list.                                                                                                                                                                                                          |
| `/modules/mailchimp/audience/{id}/add-or-remove-member-tag/{subscriber_hash}/`    | Url `list_id`, `subscriber_hash` <br/> request.body | Add or remove tags from a list member                                                                                                                                                                                                  |
| `/modules/mailchimp/audience/{id}/add-segment/`                                   |                    Url `list_id`                    | Create a new segment in a specific list.Required the request body. For details about request body visit the given link  https://mailchimp.com/developer/marketing/api/list-segments/add-segment/                                       |
| `/modules/mailchimp/audience/{id}/batch-subscribe-unsubscribe-audience/`          |                    Url `list_id`                    | Batch subscribe or unsubscribe list members.Required the request body. For details about request body visit the given link . https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/                       |
| `/modules/mailchimp/audience/{id}/delete-audience-list/`                          |                    Url `list_id`                    | Delete a list from Mailchimp account.                                                                                                                                                                                                  |
| `/modules/mailchimp/audience/{id}/delete-list-member/{subscriber_hash}/`          |          Url `list_id`, `subscriber_hash`           | Delete all personally identifiable information related to a list member, and remove them from a list.This will make it impossible to re-import the list member.                                                                        |
| `/modules/mailchimp/audience/{id}/delete-segment/{segment_id}/`                   |             Url `list_id`, `segment_id`             | Delete a specific segment in a list.                                                                                                                                                                                                   |
| `/modules/mailchimp/audience/{id}/get-audience-list/`                             |                    Url `list_id`                    | Provide information about a specific list in Mailchimp account.                                                                                                                                                                        |
| `/modules/mailchimp/audience/{id}/get-member-info/{subscriber_hash}/`             |          Url `list_id`, `subscriber_hash`           | Get information about a specific list member, including a currently subscribed, unsubscribed, or bounced member.                                                                                                                       |
| `/modules/mailchimp/audience/{id}/get-segment-info/{segment_id}/`                 |             Url `list_id`, `segment_id`             | Get information about a specific segment.                                                                                                                                                                                              |
| `/modules/mailchimp/audience/{id}/list-member-info/`                              |          Url `list_id`, `subscriber_hash`           | Get information about members in a specific Mailchimp list.                                                                                                                                                                            |
| `/modules/mailchimp/audience/{id}/list-member-tags/{subscriber_hash}/`            |          Url `list_id`, `subscriber_hash`           | Provide the tags on a list member.                                                                                                                                                                                                     |
| `/modules/mailchimp/audience/{id}/list-segment/`                                  |                    Url `list_id`                    | Provide information about all available segments for a specific list.                                                                                                                                                                  |
| `/modules/mailchimp/audience/{id}/update-audience-list/`                          |             Url `list_id`, request.body             | Update a specific segment in a list.Required the request body. For details about request body visit the given link . https://mailchimp.com/developer/marketing/api/list-segments/update-segment/                                       |
| `/modules/mailchimp/audience/{id}/update-list-member/{subscriber_hash}/`          |   Url `list_id`, `subscriber_hash`, request.body    | Update information for a specific list member.                                                                                                                                                                                         |
| `/modules/mailchimp/audience/{id}/update-segment/{segment_id}/`                   |      Url `list_id`, `segment_id`, request.body      | Update a specific segment in a list.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/list-segments/update-segment/                                        |
| `/modules/mailchimp/audience/add-audience-list/`                                  |                    request.body                     | Create a new list in Mailchimp account.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/lists/add-list/                                                   |
| `/modules/mailchimp/audience/get-audience-lists/`                                 |                        None                         | Provide information about all lists in the account.User can use optional query Parameters. For details about query Parameters visit the given link .https://mailchimp.com/developer/marketing/api/lists/get-lists-info/                |
| `/modules/mailchimp/campaign-reports/{id}/get-campaign-abuse-report/{report_id}/` |           Url `campaign_id`, `report_id`            | Get information about a specific abuse report for a campaign.                                                                                                                                                                          |
| `/modules/mailchimp/campaign-reports/{id}/get-campaign-abuse-reports/`            |                  Url `campaign_id`                  | Get a list of abuse complaints for a specific campaign.                                                                                                                                                                                |
| `/modules/mailchimp/campaign-reports/{id}/get-campaign-click-details/`            |                  Url `campaign_id`                  | Get information about clicks on specific links in your Mailchimp campaigns.                                                                                                                                                            |
| `/modules/mailchimp/campaign-reports/{id}/get-campaign-open-details/`             |                  Url `campaign_id`                  | Get detailed information about any campaign emails that were opened by a list member.                                                                                                                                                  |
| `/modules/mailchimp/campaign-reports/{id}/get-campaign-report/`                   |                  Url `campaign_id`                  | Get report details for a specific sent campaign.                                                                                                                                                                                       |
| `/modules/mailchimp/campaign-reports/list-campaign-report/`                       |                        None                         | Get campaign reports.                                                                                                                                                                                                                  |
| `/modules/mailchimp/campaigns/{id}/cancel-campaign/`                              |                  Url `campaign_id`                  | Cancel a Regular or Plain-Text Campaign after you send, before all of your recipients receive it. This feature is included with Mailchimp Pro.                                                                                         |
| `/modules/mailchimp/campaigns/{id}/delete-campaign/`                              |                  Url `campaign_id`                  | Remove a campaign from your Mailchimp account.                                                                                                                                                                                         |
| `/modules/mailchimp/campaigns/{id}/get-campaign-folder/`                          |                   Url `folder_id`                   | Get information about a specific folder used to organize campaigns.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaign-folders/get-campaign-folder/ |
| `/modules/mailchimp/campaigns/{id}/get-campaign-info/`                            |                  Url `campaign_id`                  | Get information about a specific campaign.                                                                                                                                                                                             |
| `/modules/mailchimp/campaigns/{id}/send-campaign/`                                |                  Url `campaign_id`                  | Send a Mailchimp campaign. For RSS Campaigns, the campaign will send according to its schedule. All other campaigns will send immediately.                                                                                             |
| `/modules/mailchimp/campaigns/{id}/unschedule-campaign/`                          |                  Url `campaign_id`                  | Unschedule a scheduled campaign that hasn't started sending.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaigns/unschedule-campaign/               |
| `/modules/mailchimp/campaigns/{id}/update-campaign-folder/`                       |            Url `folder_id`, request.body            | Update a specific folder used to organize campaigns.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaign-folders/update-campaign-folder/             |
| `/modules/mailchimp/campaigns/{id}/update-campaign-settings/`                     |           Url `campaign_id`, request.body           | Update some or all of the settings for a specific campaign.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaigns/update-campaign-settings/           |
| `/modules/mailchimp/campaigns/add-campaign-folder/`                               |                    request.body                     | Create a new campaign folder.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaign-folders/add-campaign-folder/                                       |
| `/modules/mailchimp/campaigns/add-campaigns/`                                     |                    request.body                     | Create a new Mailchimp campaign.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/campaigns/add-campaign/                                                  |
| `/modules/mailchimp/campaigns/list-campaign-folder/`                              |                        None                         | Get all folders used to organize campaigns.                                                                                                                                                                                            |
| `/modules/mailchimp/campaigns/list-campaigns/`                                    |                        None                         | Get all campaigns in an account.                                                                                                                                                                                                       |
| `/modules/mailchimp/templates/{id}/delete-template/`                              |                  Url `template_id`                  | Delete a specific template.                                                                                                                                                                                                            |
| `/modules/mailchimp/templates/{id}/delete-template-folder/`                       |                   Url `folder_id`                   | Delete a specific template folder, and mark all the templates in the folder as 'unfilled'.                                                                                                                                             |
| `/modules/mailchimp/templates/{id}/get_template_info/`                            |                  Url `template_id`                  | Get information about a specific template.                                                                                                                                                                                             |
| `/modules/mailchimp/templates/{id}/update-template/`                              |           Url`template_id` , request.body           | Update the name, HTML, or folder_id of an existing template.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/templates/update-template/                   |
| `/modules/mailchimp/templates/{id}/update-template-folder/`                       |            Url `folder_id`, request.body            | Update a specific folder used to organize templates.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/template-folders/update-template-folder/             |
| `/modules/mailchimp/templates/add-template/`                                      |                    request.body                     | Create a new template for the account. Only Classic templates are supported.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/templates/add-template/      |
| `/modules/mailchimp/templates/add-template-folder/`                               |                    request.body                     | Create a new template folder.Required the request body. For details about request body visit the given link .https://mailchimp.com/developer/marketing/api/template-folders/add-template-folder/                                       |
| `/modules/mailchimp/templates/list-template/`                                     |                        None                         | Get a list of an account's available templates.                                                                                                                                                                                        |
| `/modules/mailchimp/templates/list-template-folder/`                              |                        None                         | Get all folders used to organize templates.                                                                                                                                                                                            |                                                                                          |
## Postman Collection Of Mailchimp APIs
Here is a collection of all the api endpoints for the mailchimp module.
[Mailchimp-APIs Postman Collection](https://drive.google.com/file/d/1kzci3MH3eVcxX6nniaDQOSaeHQe24xFD/view?usp=share_link)

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1M2fLvKpNeSkFlPKmVkHkmN4Hr8bGGFxej1oRzMNXWZ4/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
