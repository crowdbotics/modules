## Django Articles backend configuration and information

## Module description

In this module users can view the articles list and read a specific article. Store the articles on the database.
It uses media files (Images for articles). You should enable S3 support
in your Crowdbotics app in order to get it working properly.

The following are the scope features of this module:

- Ability to request article information in accordance with the model configuration at the backend .
    - Image
    - Textfield
    - Text Area
- Ability to get a list of the articles.
- Ability to get a specific article.
- Ability to view or read the article.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required.

## Dependencies

No dependencies are required for this module.

## API details

| Api Name                          |                                      Param                                      | Description                                              |
|-----------------------------------|:-------------------------------------------------------------------------------:|:---------------------------------------------------------|
| `/modules/articles/article/`      |                     form-data `title, author, image, body`                      | Takes title, author, image, body and create the article. |
| `/modules/articles/article/{ID}`  |                           path_params `{article_ID}`                            | Takes article ID and get the specific article details.   |
| `/modules/articles/article/{ID}/` | path_params `{article_ID}`  form-data `{"title" : "", "image": "", "body": ""}` | Takes title, image, body and update the article details. |
| `/modules/articles/article/{ID}/` |                           path_params `{article_ID}`                            | Takes article ID and delete the article.                 |

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1UEQgfjBVs_rQL3kCqAtsC8fBx91_i8AC9DbrdBPGUjQ/edit?usp=sharing),
which provides more information about the module's actual intentions.
