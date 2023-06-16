## Crowdbotics Django-openAI Module - Backend

This module provides access to data and can also be used to generate and edit images or convert speech into text.


## Scope Features
The following are the key features in scope for this module.
1. Ability to retrieve the list of models.
2. Ability to retrieve the specific models.
3. Ability to create chat completion.
4. Ability to create completion.
5. Ability to create edits.
6. Ability to create image.
7. Ability to create a transcription.
8. Ability to create a translation.
9. Ability to retrieve the list of engines.
10. Ability to retrieve engines.



## OpenAI Setup
In order to configure the module, the first thing you should do is to create an app on Blackbaud. Here's the steps detailing that process:
1. Sign up at openai account.
2. On the top of the right corner, click on your profile, then on "on view API keys".
3. After that create your API key by clicking on the "+ Create new secret key" button.
4. Copy and save your API key because it generates one time only.


## Installation
1. In `.env` file add the following things:

```py
OPENAI_API_KEY=""

```

2. Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                                                       |                                  Params                                   | header                                     | Description                                                                   |
|--------------------------------------------------------------------------------|:-------------------------------------------------------------------------:|--------------------------------------------|-------------------------------------------------------------------------------|
| `{GET}``/modules/openai/get_models_list/`                                      |                                    -`                                     | -                                          | This will return an list of models.`.                                         |
| `{GET}``/modules/openai/get_model_detail/`                                     |                         `path_params: "model_id"`                         | -                                          | This will return the specific model details.                                  |                                                                                                                                      |
| `{GET}``/modules/openai/get_engine_list/`                                      |                                     -                                     | -                                          | This will return an engines list containing all its objects.                  |
| `{GET}``/modules/openai/get_engine_detail/`                                    |                        `path_params: "engine_id"`                         | -                                          | This will return an engine detail.                                            |
| `{POST}``/modules/openai/create_chat_completion/`                              |  `body_params: {"model": "", "messages": [{"role": "","content": ""}]}`   | -                                          | This will return an created chat response.                                    |
| `{POST}``/modules/openai/create_a_completion/`                                 | `body_params: {"model": "", "model": "", prompt": "","max_tokens": ""}]}` | -                                          | This will return an created completion response.                              |
| `{POST}``/modules/openai/create_an_edit/`                                      |        `body_params: {"model": "", "instruction":"", "input":""}`         | -                                          | This api will create edit for the provided input, instruction, and parameter. |
| `{POST}``/modules/openai/create_an_image/`                                     |             `body_params: {"prompt": "", "n":"", "size":""}`              | -                                          | This api is used to return as your input image url.                           |
| `{POST}``/modules/openai/create_an_transcription/`                             |                  `body_params: {"file": "", "model":""}`                  | -                                          | This will return an transcript text.                                          |
| `{POST}``/modules/openai/create_an_translation/`                               |                  `body_params: {"file": "", "model":""}`                  | -                                          | This will return an translated text of your input.                            |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)