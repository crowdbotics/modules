## Crowdbotics Articles Component - Backend

In this module users can view the articles list and read a specific article. Store the articles on the database.

- This module uses media files (Images for articles). You should enable S3 support
  in your Crowdbotics app in order to get it working properly.

# Setup

```
python manage.py makemigrations
python manage.py migrate
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
