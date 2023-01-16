## Crowdbotics Django Disqus Component - Backend

This module contains all needed resources to get the Disqus component for React
Native mobile client.


### Installation
1. Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

|                   Api Name                    |                    Params                     | Description                                                                                                                                           |
|:---------------------------------------------:|:---------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/disqus/comment/`, `GET` |                       -                       | Returns list of all the comments. |
| `/modules/disqus/comment/{comment_id}`, `GET` |                       -                       | Returns details against the specified `comment_id`.                                                                                                   |
|      `/modules/disqus/comment/`, `POST`       | `{item_uuid, comment, user, parent_comment}`  | Takes object containing the `item_uuid`of any item/post a `user` is commenting on. `parent_comment` only if the user is commenting under a `comment`. |
|       `/modules/disqus/comment/`, `PUT`       | `{item_uuid, comment, user, parent_comment}`  | Updates an existing comment `comment`. |
|       `/modules/disqus/comment/{comment_id}`, `DELETE`  | - | Deletes the comment against the provided `comment_id`.|
|  `/modules/disqus/comment-like/`, `POST`   |               `{user, comment}`               | Takes an object with id of the `user` how is liking or disliking the `comment`.  |
|  `/modules/disqus/comment-like/`, `GET`   |              -               |  Returns list of all the liked comments with the user who liked the comment. |
|  `/modules/disqus/comment-like/{liked_comment_id}`, `GET`   |              -               |  Returns an object of the liked comment with the user who liked the comment. |
|  `/modules/disqus/comment-like/{liked_comment_id}`, `DELETE`   |              -               |  Deletes an object of the liked comment with the user who liked the comment. |
