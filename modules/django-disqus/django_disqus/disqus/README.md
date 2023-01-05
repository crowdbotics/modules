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
| `/modules/disqus/comment/{comment_id}`, `GET` |                       -                       | Returns details against the specified `comment_id`.                                                                                                   |
|      `/modules/disqus/comment/`, `POST`       | `{item_uuid, comment, user, parent_comment}`  | Takes object containing the `item_uuid`of any item/post a `user` is commenting on. `parent_comment` only if the user is commenting under a `comment`. |
|       `/modules/disqus/comment/`, `PUT`       | `{item_uuid, comment, user, parent_comment}`  | Updates an existing comment `comment`.                                                                                                                |
|  `/modules/disqus/like-on-comment/`, `POST`   |               `{user, comment}`               | Takes an object with id of the `user` how is liking or disliking the `comment`.                                                                       |