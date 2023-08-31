## django-disqus backend configuration and information

## Module description

By using this module, users will be able to add comments and like/dislike on a post, blog or product. Store the comments and like/dislike data in Database.

The following are the key features in scope for this module. 
- Comment on a post/product
- Get the detail of a specific comment
- Comment under comment or replay a comment
- Like/  dislike a comment
- Save comments and like/dislike data in DB

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables.

## 3rd party setup

No third party setup needed.

## Dependencies

No dependencies used.

## API details

|                   Api Name                    |                    Params                     | Description                                                                                                                                           |
|:---------------------------------------------:|:---------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/disqus/comment/{comment_id}`, `GET` |                       -                       | Returns details against the specified `comment_id`.                                                                                                   |
|      `/modules/disqus/comment/`, `POST`       | `{item_uuid, comment, user, parent_comment}`  | Takes object containing the `item_uuid`of any item/post a `user` is commenting on. `parent_comment` only if the user is commenting under a `comment`. |
|       `/modules/disqus/comment/`, `PUT`       | `{item_uuid, comment, user, parent_comment}`  | Updates an existing comment `comment`.                                                                                                                |
|  `/modules/disqus/like-on-comment/`, `POST`   |               `{user, comment}`               | Takes an object with id of the `user` how is liking or disliking the `comment`.                                                                       |


## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1cHb4Jg1nxQVg3v1wAT-QuevcuNKhLmw7BRyKmgBG65w/edit?usp=sharing), which provides more information about the module's actual intentions.
