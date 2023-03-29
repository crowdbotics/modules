# Django Disqus- Backend
By using this module, users will be able to add comments and like/dislike on a post, blog, or product. Store the comments and like/dislike data in Database.

## Scope Features
The following are the key features in scope for this module. 
1. Comment on a post/product
2. Get the detail of a specific comment
3. Comment under comment or replay a comment
4. Like/  dislike a comment
5. Save comments and like/dislike data in DB


### Installation Setup
1. For Makemigrations:
```
python manage.py makemigrations
```
1. Run migrations:
```
python manage.py migrate
```

2. Run the following commands to get started:

```
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

|                   Api Name                    |                    Params                     | Description                                                                                                                                           |
|:---------------------------------------------:|:---------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/disqus/comment/{comment_id}`, `GET` |                       -                       | Returns details against the specified `comment_id`.                                                                                                   |
|      `/modules/disqus/comment/`, `POST`       | `{item_uuid, comment, user, parent_comment}`  | Takes object containing the `item_uuid`of any item/post a `user` is commenting on. `parent_comment` only if the user is commenting under a `comment`. |
|       `/modules/disqus/comment/`, `PUT`       | `{item_uuid, comment, user, parent_comment}`  | Updates an existing comment `comment`.                                                                                                                |
|  `/modules/disqus/like-on-comment/`, `POST`   |               `{user, comment}`               | Takes an object with id of the `user` how is liking or disliking the `comment`.                                                                       |

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1cHb4Jg1nxQVg3v1wAT-QuevcuNKhLmw7BRyKmgBG65w/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)