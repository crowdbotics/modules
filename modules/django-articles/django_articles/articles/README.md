# Articles Module - Backend

In this module users can view the articles list and read a specific article. Store the articles on the database.

- This module uses media files (Images for articles). You should enable S3 support
  in your Crowdbotics app in order to get it working properly.

## Scope Features
The following are the key features in scope for this module.
1. Ability to request article information in accordance with the model configuration at the backend 
- Image
- Textfield
- Text Area
2. Ability to get a list of the articles
3. Ability to get a specific article
4. Ability to view or read the article

# Setup Installation
For Makemigration setup :
```
python manage.py makemigrations
```
Run Migrations :
```
python manage.py migrate
```
Start the server by running the following command :
```
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                        |                       Param                       | Description                                                                                        |
|-------------------------------------------------|:-------------------------------------------------:|:---------------------------------------------------------------------------------------------------|
| `/modules/articles/article/`                  |      form-data `title, author, image, body`      | Takes title, author, image, body and create the article.           |
| `/modules/articles/article/{ID}`                   |   params `{article_ID}`    | Takes article ID and get the specific article details.                         |
| `/modules/articles/article/{ID}/`                |           params `{article_ID}`  body `{"title" : "", "image": "", "body": ""}`   | Takes title, image, body and update the article details.                                                          |
| `/modules/articles/article/{ID}/`        |    params `{article_ID}`       | Takes article ID and delete the article.                           |

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1UEQgfjBVs_rQL3kCqAtsC8fBx91_i8AC9DbrdBPGUjQ/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)