## Social Feed backend configuration and information

## Module description

This social feed module handles various social feed abilities, including creating posts, commenting on posts, liking and
unliking posts, reporting posts, and other social media post-related functionalities.

The scope features for this module are following:

- Ability to create a post.
- Ability to create a comment on post.
- Ability to like a comment on post.
- Ability to unlike a comment on post.
- Ability to follow a post user.
- Ability to unfollow a post user.
- Ability to report a user's post.
- Ability to upvote a user's post.
- Ability to down vote a user's post.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required for this module.

## Dependencies

No dependencies are used.

## API details

| Api Name                                            |                                          Param                                          | Description                                                                                   |
|-----------------------------------------------------|:---------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------|
| `/modules/social-feed/create-post/` `POST`          |                               form-data `caption, media`                                | Take caption and media (image) and create the user's post.                                    |
| `/modules/social-feed/my-feed/` `GET`               |                                            -                                            | Return the list of user's posts.                                                              |
| `/modules/social-feed/my-profile/` `GET`            |                                            -                                            | Return the list of user's posts containing it detail such as followers, followings and owner. |
| `/modules/social-feed/profile/{id}/` `GET`          |                                  path_param `user_id`                                   | Return a user with its profile and posts details.                                             |
| `/modules/social-feed/my-followers/` `GET`          |                                            -                                            | Return a user with its followers detail.                                                      |
| `/modules/social-feed/my-following/` `GET`          |                                            -                                            | Return a user's following list.                                                               |
| `/modules/social-feed/follow/{id}/` `POST`          |                                  path_params `user_id`                                  | Takes user id and follow the user.                                                            |
| `/modules/social-feed/unfollow/{id}/` `POST`        |                                  path_params `user_id`                                  | Takes user id and unfollow the user.                                                          |
| `/modules/social-feed/like-post/` `POST`            |                                  body_param `post_id`                                   | Takes post id and like the post.                                                              |
| `/modules/social-feed/unlike-post/` `POST`          |                                  body_param `post_id`                                   | Takes post id and unlike the post.                                                            |
| `/modules/social-feed/like-comment/` `POST`         |                                 body_param `comment_id`                                 | Takes comment id and like the comment.                                                        |
| `/modules/social-feed/unlike-comment/` `POST`       |                                 body_param `comment_id`                                 | Takes comment id and unlike the comment.                                                      |
| `/modules/social-feed/report-post/` `POST`          |                              body_params `post_id, reason`                              | Takes post id and report the post with reason.                                                |
| `/modules/social-feed/post-comment/` `POST`         |                             body_params `post_id, comment`                              | Takes post id and create a comment on post.                                                   |
| `/modules/social-feed/delete-comment/` `POST`       |                                 body_param `comment_id`                                 | Takes comment id and delete a comment from post.                                              |
| `/modules/social-feed/post/` `POST`                 |            form-data `caption, media['post', 'image', 'video'], description`            | Takes post's payload and create a post.                                                       |
| `/modules/social-feed/postmedia/` `POST`            |                          form-data `'post', 'image', 'video'`                           | Takes post media's payload and create a postmedia.                                            |
| `/modules/social-feed/reportpost/` `POST`           |                             body_params `'post', 'reason'`                              | Takes post-id and reason to report a post.                                                    |
| `/modules/social-feed/followrequest/` `POST`        |                      body_params `'generated_by', 'generated_for'`                      | Takes follow request payload for follow request.                                              |
| `/modules/social-feed/postcomment/` `POST`          |                 body_params `'comment', 'image', 'ref_comment', 'post'`                 | Takes post comment payload for create a comment on post.                                      |
| `/modules/social-feed/likecomment/` `POST`          |                           body_params `'comment', 'liked_by'`                           | Takes comment id and user for like a comment on post.                                         |
| `/modules/social-feed/upvotepost/` `POST`           |                            body_params `'post', 'upvote_by'`                            | Takes post id and user for upvote a post.                                                     |
| `/modules/social-feed/downvotepost/` `POST`         |                           body_params `'post', 'downvote_by'`                           | Takes post id and user for down vote a post.                                                  |
| `/modules/social-feed/post/{id}/` `GET`             |                                  path_param `post_id`                                   | Takes post id and return a post detail.                                                       |
| `/modules/social-feed/followrequest/{id}/` `GET`    |                             path_param `follow_request_id`                              | Takes follow_request_id and return a follow request detail.                                   |
| `/modules/social-feed/reportpost/{id}/` `GET`       |                               path_param `reportpost_id`                                | Takes report post_id and return a reported post details.                                      |
| `/modules/social-feed/postmedia/{id}/` `GET`        |                               path_param `post_media_id`                                | Takes postmedia id and return postmedia detail.                                               |
| `/modules/social-feed/postcomment/{id}/` `GET`      |                              path_param `post_comment_id`                               | Takes post_comment_id and return comment detail.                                              |
| `/modules/social-feed/likecomment/{id}/` `GET`      |                              path_param `like_comment_id`                               | Takes like_comment_id and return liked comment detail.                                        |
| `/modules/social-feed/upvotepost/{id}/` `GET`       |                               path_param `upvote_post_id`                               | Takes upvote_post_id and return upvote post detail.                                           |
| `/modules/social-feed/downvotepost/{id}/` `GET`     |                             path_param `down_vote_post_id`                              | Takes down_vote_post_id and return down vote post detail.                                     |
| `/modules/social-feed/post/{id}/` `PUT`             | form-data `caption, media['post', 'image', 'video'], description`  path_param `post_id` | Takes post's payload and update the post detail.                                              |
| `/modules/social-feed/followrequest/{id}/` `PUT`    |      body_params `'generated_by', 'generated_for'`  path_param `follow_request_id`      | Takes follow request's payload and update the follow request.                                 |
| `/modules/social-feed/reportpost/{id}/` `PUT`       |               body_params `'post', 'reason'`  path_param `reportpost_id`                | Takes report post_id and update the reported post.                                            |
| `/modules/social-feed/postmedia/{id}/` `PUT`        |             form-data `'post', 'image', 'video'`  path_param `postmedia_id`             | Takes post media's payload and update the postmedia detail.                                   |
| `/modules/social-feed/postcomment/{id}/` `PUT`      |  body_params `'comment', 'image', 'ref_comment', 'post'`  path_param `post_comment_id`  | Takes post comment's payload and update the comment on post.                                  |
| `/modules/social-feed/likecomment/{id}/` `PUT`      |            body_params `'comment', 'liked_by'`  path_param `like_comment_id`            | Takes liked comment's payload and update the liked comment on post.                           |
| `/modules/social-feed/upvotepost/{id}/` `PUT`       |             body_params `'post', 'upvote_by'`  path_param `upvote_post_id`              | Takes upvote post's payload and update the upvote on post.                                    |
| `/modules/social-feed/downvotepost/{id}/` `PUT`     |           body_params `'post', 'downvote_by'`  path_param `down_vote_post_id`           | Takes down vote post's payload and update the down vote on post.                              |
| `/modules/social-feed/post/{id}/` `DELETE`          |                                  path_param `post_id`                                   | Takes post id and delete a post.                                                              |
| `/modules/social-feed/followrequest/{id}/` `DELETE` |                             path_param `follow_request_id`                              | Takes follow_request_id and delete the request.                                               |
| `/modules/social-feed/postmedia/{id}/` `DELETE`     |                                path_param `postmedia_id`                                | Takes post media_id and delete a postmedia.                                                   |
| `/modules/social-feed/reportpost/{id}/` `DELETE`    |                               path_param `reportpost_id`                                | Takes report post_id and delete a reported post.                                              |
| `/modules/social-feed/postcomment/{id}/` `DELETE`   |                              path_param `post_comment_id`                               | Takes post comment_id and delete a comment from post.                                         |
| `/modules/social-feed/likecomment/{id}/` `DELETE`   |                              path_param `like_comment_id`                               | Takes like_comment_id and delete a liked comment.                                             |
| `/modules/social-feed/upvotepost/{id}/` `DELETE`    |                               path_param `upvote_post_id`                               | Takes upvote_post_id and upvote on post.                                                      |
| `/modules/social-feed/downvotepost/{id}/` `DELETE`  |                             path_param `down_vote_post_id`                              | Takes down_vote_post_id and down vote on post.                                                |
