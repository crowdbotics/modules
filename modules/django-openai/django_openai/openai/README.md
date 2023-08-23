##  django-openai backend configuration and information

## Module description

This module provides access to data of models and engines and can also be used to generate and edit images or convert speech into text.

The following are the key features in scope for this module.
- Ability to retrieve the list of models.
- Ability to retrieve the specific models.
- Ability to create chat completion.
- Ability to create completion.
- Ability to create edits.
- Ability to create image.
- Ability to create a transcription.
- Ability to create a translation.
- Ability to retrieve the list of engines.
- Ability to retrieve engines.

## ## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.


## ## Environment variables
```dotenv
OPENAI_API_KEY="<openai-api-key>"
```

## 3rd party setup
In order to configure the module, the first thing you should do is to create an app on OpenAI. Here's the steps detailing that process:
1. [Sign up](https://openai.com/) at openai account.
2. On the top of the right corner, click on your profile, then on "on view API keys".
3. After that create your API key by clicking on the "+ Create new secret key" button.
4. Copy and save your API key because it generates one time only.

## Dependencies
No dependencies used.

## API details

| Api Name                                       | Params                                                                    | Description                                                                   |
|------------------------------------------------|:--------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `{GET}``/modules/openai/models/`               | -                                                                         | This will return an list of models.`.                                         |
| `{GET}``/modules/openai/models/<model_id>/`    | `path_params: "model_id"`                                                 | This will return the specific model details.                                  |                                                                                                                                      |
| `{GET}``/modules/openai/engines/`              | -                                                                         | This will return an engines list containing all its objects.                  |
| `{GET}``/modules/openai/engines/<engine_id>/`  | `path_params: "engine_id"`                                                | This will return an engine detail.                                            |
| `{POST}``/modules/openai/chat/completions/`    | `body_params: {"model": "", "messages": [{"role": "","content": ""}]}`    | This will return an created chat response.                                    |
| `{POST}``/modules/openai/completion/`          | `body_params: {"model": "", "model": "", prompt": "","max_tokens": ""}]}` | This will return an created completion response.                              |
| `{POST}``/modules/openai/edits/`               | `body_params: {"model": "", "instruction":"", "input":""}`                | This api will create edit for the provided input, instruction, and parameter. |
| `{POST}``/modules/openai/images/generations/`  | `body_params: {"prompt": "", "n":"", "size":""}`                          | This api is used to return as your input image url.                           |
| `{POST}``/modules/openai/audio/transcription/` | `body_params: {"file": "", "model":""}`                                   | This will return an transcript text.                                          |
| `{POST}``/modules/openai/audio/translation/`   | `body_params: {"file": "", "model":""}`                                   | This will return an translated text of your input.                            |
