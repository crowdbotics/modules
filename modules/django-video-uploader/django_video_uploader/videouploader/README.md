## Crowdbotics Video Uploader (Vimeo) Component - Backend

This module contains all needed resources to get the Video Uploader component for React
Native mobile client. The Vimeo API includes a full set of features for uploading and managing video files. you can
access all the amazing upload capabilities of `vimeo.com`.

## Features

1. Create a video
2. Get a specific video
3. Get the list of videos
4. Edit an existing video
5. Delete an existing video
6. Like and unlike video
7. Create a new folder
8. Get folder details and list
9. Edit folder
10. Delete a specific folder
11. Add videos to folder
12. Create a new showcase
13. Edit showcase
14. Get showcase detail list
15. Update an existing showcase
16. Delete a specific showcase
17. Add videos to showcase
18. Create groups
19. Get group details and list
20. Update group
21. Delete group
22. Add users and videos to group
23. Create channels
24. Get channel details and list
25. Update channel
26. Delete an existing channel

### Setup App on Vimeo ang get credentials

1. Login to [Vimeo Developer account](https://developer.vimeo.com/)
2. click on the ` + Create an app` button in the top-right corner of the page.
3. Enter the `name`, `description` of your app and click `Create app` button.
4. On your app page you will be able to see the `Client identifier` and `Client secrets` which can be used to get
   the `access_token` to authenticate the API calls.
5. To get the personal `access_token` to authenticate api calls, check the radio button `Authenticated(you)` to and
   select the scopes of the token. Click the `Generate` button. Token will be generated with the selected scopes. This
   token will be a `bearer` token.
   ![Vimeo](https://user-images.githubusercontent.com/76822297/227928463-93aa27ec-2cf4-463f-9fbb-fdc6f82a0bd5.png)

### Setup Environment Variables

In your `.env` file update the following:

```
VIDEO_UPLOADER_BASE_URL=https://api.vimeo.com
VIDEO_UPLOADER_ACCESS_TOKEN=your vimeo app personal access_token
VIDEO_UPLOADER_CLIENT_ID=Your App's Client identifier
VIDEO_UPLOADER_CLIENT_SECRET=Your App's Client secret
```

## Installations

1. Run migrations

```
python manage.py migrate
```

2. Run the server

```
python manage.py runserver
```

### Api Table

List of api endpoints with params needed for these apis.

|                                                Api Name                                                |                                                                     Params                                                                      | Description                                                                                                                                                                                                                                                 |
|:------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                          `/modules/videouploader/service/access-token` `POST`                          |                                                                        -                                                                        | Returns access-token to interact with vimeo APIs.                                                                                                                                                                                                           |
|                 `/modules/videouploader/service/{channel_id}/channel/delete/` `DELETE`                 |                                                                        -                                                                        | Deletes the channel against the provided `channel_id`.                                                                                                                                                                                                      |
|                 `/modules/videouploader/service/{channel_id}/channel/specific/` `GET`                  |                                                                        -                                                                        | Returns a single channel against the provided `channel_id`.                                                                                                                                                                                                 |
|                 `/modules/videouploader/service/{channel_id}/channel/update/`  `PATCH`                 |                                                  params `{ name, description, link, privacy}`                                                   | Updates the details of an existing channel.                                                                                                                                                                                                                 |
|              `/modules/videouploader/service/{group_id}/group/add-user/{user_id}/`  `PUT`              |                                                                        -                                                                        | Adds a user to a specific group.                                                                                                                                                                                                                            |
|             `/modules/videouploader/service/{group_id}/group/add-video/{video_id}/`  `PUT`             |                                                                        -                                                                        | Adds a video to a specific group.                                                                                                                                                                                                                           |
|                  `/modules/videouploader/service/{group_id}/group/delete/`  `DELETE`                   |                                                                        -                                                                        | Deletes the group against the provided `group_id`.                                                                                                                                                                                                          |
|                   `/modules/videouploader/service/{group_id}/group/specific/`  `GET`                   |                                                                        -                                                                        | Returns a single group against the provided `group_id`.                                                                                                                                                                                                     |
|    `/modules/videouploader/service/{user_id}/user/folder/{folder_id}/add-video/{video_id}/`  `PUT`     |                                                                        -                                                                        | Adds a video to a folder created by a specific user.                                                                                                                                                                                                        |
|                 `/modules/videouploader/service/{user_id}/user/folder/create/`  `POST`                 |                                                       params `{name, parent_folder_uri}`                                                        | Takes object with folder name `name` and `parent_folder_uri` if creating a folder inside a folder. Creates folder with the provided name.                                                                                                                   |
|          `/modules/videouploader/service/{user_id}/user/folder/delete/{folder_id}/`  `DELETE`          |                                                                        -                                                                        | Deletes the folder against the provided `folder_id`.                                                                                                                                                                                                        |
|                  `/modules/videouploader/service/{user_id}/user/folder/list/`  `GET`                   |                                              query_params `direction, page, per_page, query, sort`                                              | `direction` can be `asc or desc` , number of the `page` and number of items to be returned `per_page`. Sort the result by any of the followings `alphabetical, data, default, followers, relevant, videos`. Returns the list of the folders for the user.   |
|          `/modules/videouploader/service/{user_id}/user/folder/specific/{folder_id}/`  `GET`           |                                                                        -                                                                        | Returns a single folder against the provided `folder_id`.                                                                                                                                                                                                   |
|          `/modules/videouploader/service/{user_id}/user/folder/update/{folder_id}/`  `PATCH`           |                                                  params `{ name, description, link, privacy}`                                                   | Takes object with folder name `name` and `parent_folder_uri` if updating a folder inside a folder. Updates folder with the provided name.                                                                                                                   |
|             `/modules/videouploader/service/{user_id}/user/likes/video/{video_id}/`  `PUT`             |                                                                        -                                                                        | Adds a like to a video.                                                                                                                                                                                                                                     |
| `/modules/videouploader/service/{user_id}/user/showcase/album/{album_id}/add-video/{video_id}/`  `PUT` |                                                                        -                                                                        | Adds a video to a showcase.                                                                                                                                                                                                                                 |
|                `/modules/videouploader/service/{user_id}/user/showcase/create/`  `POST`                |            params `{brand_color, description, hide_nav, hide_upcoming, layout, name, password, privacy, review_mode, sort, theme }`             | Creates a new showcase for a user.                                                                                                                                                                                                                          |
|         `/modules/videouploader/service/{user_id}/user/showcase/delete/{album_id}/`  `DELETE`          |                                                                        -                                                                        | Deletes an exiting showcase.                                                                                                                                                                                                                                |
|                 `/modules/videouploader/service/{user_id}/user/showcase/list/`  `GET`                  |                                                                        -                                                                        | `direction` can be `asc or desc` , number of the `page` and number of items to be returned `per_page`. Sort the result by any of the followings `alphabetical, data, default, followers, relevant, videos`. Returns the list of the showcases for the user. |
|          `/modules/videouploader/service/{user_id}/user/showcase/specific/{album_id}/`  `GET`          |                                                                        -                                                                        | Returns a single showcase against the provided `album_id`.                                                                                                                                                                                                  |
|          `/modules/videouploader/service/{user_id}/user/showcase/update/{album_id}/`  `PATCH`          | params `{ brand_color, description hide_nav, hide_upcoming, layout, name, password, privacy, review_mode, sort, theme, url, use_custom_domain}` | Updates an exiting showcase and returns updated showcase.                                                                                                                                                                                                   |
|          `/modules/videouploader/service/{user_id}/user/unlikes/video/{video_id}/`  `DELETE`           |                                                                        -                                                                        | Unlikes a showcase if its already liked by the user.                                                                                                                                                                                                        |
|                   `/modules/videouploader/service/{user_id}/user/video/list/`  `GET`                   |                                                                        -                                                                        | Returns a list of videos created/uploaded by the user.                                                                                                                                                                                                      |
|                  `/modules/videouploader/service/{video_id}/video/delete/`  `DELETE`                   |                                                                        -                                                                        | Deletes an existing video.                                                                                                                                                                                                                                  |
|                   `/modules/videouploader/service/{video_id}/video/specific/`  `GET`                   |                                                                        -                                                                        | Returns details of an existing video.                                                                                                                                                                                                                       |
|                        `/modules/videouploader/service/channel/create/`  `POST`                        |                                                  params  `{name, description, link, privacy }`                                                  | Creates a new channel with the provided `name`.                                                                                                                                                                                                             |
|                          `/modules/videouploader/service/channel/list/` `GET`                          |                                          query_params `direction, filter, page, per_page, query, sort`                                          | Returns a list of the channels.                                                                                                                                                                                                                             |
|                         `/modules/videouploader/service/video/create/` `POST`                          |                                           params `{name, description, approach, size, redirect_url}`                                            | Creates a new video with the provided approach.                                                                                                                                                                                                             |
|                         `/modules/videouploader/service/group/create/` `POST`                          |                                                          params `{name, description}`                                                           | Creates a new group with the provided `name` and `description`.                                                                                                                                                                                             |
|                           `/modules/videouploader/service/group/list/` `GET`                           |                                          query_params `direction, filter, page, per_page, query, sort`                                          | Returns a list of the groups.                                                                                                                                                                                                                               |
|                   `/modules/videouploader/service/{video_id}/video/update/` `PATCH`                    |                                           params `{name, description, approach, size, redirect_url}`                                            | Creates a new video with the provided approach.                                                                                                                                                                                                             |

**Note**
Some of the Apis working will be limited if using with vimeo free trial.

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1SMV-SVuyNENi71y_3nYJu4W1PT4kqeiA9r0qRFOvPSk/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
