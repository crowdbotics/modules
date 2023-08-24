## Django-Typeform-Webhook backend configuration and information

## Module description

Django Typeform Webhook provides backend support for the React Native Typeform Webhook. It seamlessly integrates with
Typeform APIs that enabling data retrieval and forwarding it to the designated URLs.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No Environment variables needed.

## 3rd party setup

Follow these steps to create a required TypeForm account:

- Create your [Typeform Webhook Account](https://www.typeform.com/signup/).
- From your dashboard, select `Create Typeform`.
- Select the type of Typeform webhook you need.
- Click the `+` icon in the top left corner to add your content.
- Once you're done, click `Publish` to create your Typeform webhook.
- After creation, click `Connect` in the top middle menu bar.
- Then, Click `Add a Webhook`.
- Add your webhook endpoint URL and save it.
- Remember to save your `secret_key` for future use.
  ![typeform](https://user-images.githubusercontent.com/76822297/227494296-dd4d30ed-2d68-4675-a0a6-1304b0222292.png)

## Dependencies

The dependencies are following:

- [django-jsonfield](https://pypi.org/project/django-jsonfield/)

## API details

API Endpoints and Required Parameters List.

| Api Name                                      |                                      Param                                       | Description                                                                                |
|-----------------------------------------------|:--------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------|
| `/modules/typeform-webhook/form-answer/${id}` |                              path_params `form_id`                               | Takes id of the form submitted by users and returns the list of answers against that form. |
| `/modules/typeform-webhook/webhook/`          | [Webhook Payload](https://www.typeform.com/developers/webhooks/example-payload/) | Create or update a webhook.                                                                |


