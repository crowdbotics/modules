## Django Video Uploader (Vimeo) backend configuration and information

## Module description

Vimeo API includes a full set of features for uploading and managing video files. you can
access all the amazing upload capabilities at `vimeo.com`.

The following are the scope features for this module.

- Module perform various operations in the system, such as video management, folder organization, showcase creation,
  group administration, and channel handling.

- For videos, which can create, retrieve, list, edit, delete, and engage with them through likes or dislikes.

- Folders enhance organization, which can create, access details/lists, edit, delete, and add videos for structured
  content.

- Showcases highlight content, which can create, edit, retrieve details/lists, update, delete, and add videos.

- Groups support collaboration can create, access details/lists, update settings, delete, and manage users and videos
  efficiently

- Lastly, Channels facilitate content distribution which can create, access details/lists, update settings, or delete
  for a streamlined platform.

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

Following are the `.env` variables which are required:

```dotenv
VIDEO_UPLOADER_BASE_URL="https://api.vimeo.com"
VIDEO_UPLOADER_ACCESS_TOKEN="your vimeo app personal access_token"
VIDEO_UPLOADER_CLIENT_ID="Your App's Client identifier"
VIDEO_UPLOADER_CLIENT_SECRET="Your App's Client secret"
```

## ## 3rd party setup

Follow these steps to create a required TypeForm account:

- Login to [Vimeo Developer account](https://developer.vimeo.com/)
- click on the ` + Create an app` button in the top-right corner of the page.
- Enter the `name`, `description` of your app and click `Create app` button.
- On your app page you will be able to see the `Client identifier` and `Client secrets` which can be used to get
  the `access_token` to authenticate the API calls.
- To get the personal `access_token` to authenticate api calls, check the radio button `Authenticated(you)` to and
  select the scopes of the token. Click the `Generate` button. Token will be generated with the selected scopes. This
  token will be a `bearer` token.
  ![Vimeo](https://user-images.githubusercontent.com/76822297/227928463-93aa27ec-2cf4-463f-9fbb-fdc6f82a0bd5.png)

## Dependencies

No Dependencies used.

## API details

API Endpoints and Required Parameters List.

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
Certain APIs have limited functionality when used during a Vimeo free trial.

