from unittest import mock

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class VideoUploaderViewSetTests(APITestCase):

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_access_token')
    def test_create_access_token(self, create_access_token_mock):
        response = {
            'data': {'access_token': 'de477hhr4444de44b990f610ed4647', 'token_type': 'bearer', 'scope': 'public',
                     'app': {'name': 'Demo App', 'uri': '/apps/262269'}}, 'status_code': 200}
        create_access_token_mock.return_value = response
        data = {
            "grant_type": "client_credentials",
            "scope": ["public", "private"]
        }
        response = self.client.post(reverse('video_uploader_service-create-access-token'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_access_token_mock.assert_called_once()

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_access_token')
    @mock.patch(
        'modules.django_video_uploader.videouploader.viewsets.VideoUploaderViewSet.convert_into_base64')
    def test_create_access_token_with_wrong_client_id(self, convert_into_base64_mock, create_access_token_mock):
        response = {'data': {'error': 'Something strange occurred. Please contact the app owners.', 'link': None,
                             'developer_message': 'No user credentials were provided.', 'error_code': 8003},
                    'status_code': 401}
        create_access_token_mock.return_value = response
        data = {
            "grant_type": "client_credentials",
            "scope": ["public"],
        }
        token = {'data': 'invalid client_id'}
        convert_into_base64_mock.return_value = token
        response = self.client.post(reverse('video_uploader_service-create-access-token'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        create_access_token_mock.assert_called_once()
        convert_into_base64_mock.assert_called_once()
        create_access_token_mock.assert_called_once_with(payload=data, token=token)

    def test_create_access_token_without_data(self):
        data = {}
        response = self.client.post(reverse('video_uploader_service-create-access-token'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_channel')
    def test_create_channel(self, create_channel_mock):
        response = {"data": {
            "uri": "/channels/6466464",
            "name": "new channel",
            "description": "new channel",
            "link": "https://vimeo.com/channels/6466464",
            "created_time": "2023-01-27T11:38:55+00:00",
            "modified_time": "2023-01-27T11:39:53+00:00",
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [
                        {
                            "width": 30,
                            "height": 30,
                            "link": "https://i.vimeocdn.com/portrait/82481466_30x30"
                        },
                    ],
                    "resource_key": "23b7a8a1f898967546b234909f0ed2aea27adf3f",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 0
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "aa50fecd567506741ffb60d9368cacf12bd9c8dd",
                "account": "free"
            },
            "tags": [],
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 100,
                        "height": 75,
                        "link": "https://i.vimeocdn.com/video/default_100x75?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/channel/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/channel/default_980x250"
                    }
                ],
                "resource_key": "2d326acc5bef3bfcb11f7c0555cae2de710dd782",
                "default_picture": True
            },
            "privacy": {"view": "users"},
            "categories": [],
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/channels/6466464/users",
                        "options": ["GET"],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/channels/6466464/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "privacy_users": {
                        "uri": "/channels/6466464/privacy/users",
                        "options": ["GET", "PUT"],
                        "total": 0
                    }
                },
                "interactions": {
                    "add_moderators": {
                        "uri": "/channels/6466464/moderators",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    },
                    "follow": {
                        "added": "false",
                        "added_time": None,
                        "type": None,
                        "uri": "/users/646646464/channels/6466464"
                    },
                    "moderate_videos": {
                        "uri": "/channels/6466464/videos",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    }
                }
            },
            "resource_key": "5da0f8d9694896dbcc9c3a0e5b1ceae80371cf82"
        },
            "status_code": 201}
        create_channel_mock.return_value = response
        data = {
            "description": "new channel",
            "link": "https://api.com",
            "name": "new channel",
            "privacy": "anybody"
        }
        response = self.client.post(reverse('video_uploader_service-create-channel'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_channel_mock.assert_called_once()
        create_channel_mock.assert_called_once_with(payload=data)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_channel')
    def test_create_channel_with_no_create_scope(self, create_channel_mock):
        response = {'data': {'error': 'Your access token does not have the "create" scope'}, 'status_code': 403}
        create_channel_mock.return_value = response
        data = {
            "description": "string",
            "link": "https://api.com",
            "name": "string",
            "privacy": "anybody"
        }
        response = self.client.post(reverse('video_uploader_service-create-channel'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        create_channel_mock.assert_called_once()
        create_channel_mock.assert_called_once_with(payload=data)

    def test_create_channel_without_data(self):
        data = {}
        response = self.client.post(reverse('video_uploader_service-create-channel'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_channel')
    def test_delete_channel(self, delete_channel_mock):
        response = {"data": {"message": "Item deleted successfully."}, "status_code": 204}
        delete_channel_mock.return_value = response
        channel_id = 6466464
        response = self.client.delete(reverse('video_uploader_service-delete-channel', args=(channel_id,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_channel_mock.assert_called_once()
        delete_channel_mock.assert_called_once_with(channel_id='6466464', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_channel')
    def test_delete_channel_with_wrong_id(self, delete_channel_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        delete_channel_mock.return_value = response
        channel_id = 6466464
        response = self.client.delete(reverse('video_uploader_service-delete-channel', args=(channel_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_channel_mock.called_once()
        delete_channel_mock.called_once_with(channel_id='6466464', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_channel')
    def test_delete_channel_with_no_delete_scope(self, delete_channel_mock):
        response = {"data": {"error": "The user isn't allowed to perform that action."}, "status_code": 403}
        delete_channel_mock.return_value = response
        channel_id = 6466464
        response = self.client.delete(reverse('video_uploader_service-delete-channel', args=(channel_id,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_channel_mock.called_once()
        delete_channel_mock.called_once_with(channel_id='6466464', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_channel')
    def test_update_channel_with_invalid_id(self, update_channel_mock):
        response = {"data": {"message": "Resource not found"},
                    "status_code": 404}
        update_channel_mock.return_value = response
        channel_id = 6466464
        data = {
            "description": "new channel updated",
            "link": "https://api.com",
            "name": "new channel",
            "privacy": "anybody"
        }
        response = self.client.patch(reverse('video_uploader_service-update-channel', args=(channel_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_channel_mock.called_once()
        update_channel_mock.called_once_with(channel_id='6466464', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_channel')
    def test_update_channel(self, update_channel_mock):
        response = {"data": {
            "uri": "/channels/3555555",
            "name": "new channel",
            "description": "new channel updated",
            "link": "https://vimeo.com/channels/3555555",
            "created_time": "2023-01-27T11:38:55+00:00",
            "modified_time": "2023-01-27T11:39:53+00:00",
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [
                        {
                            "width": 30,
                            "height": 30,
                            "link": "https://i.vimeocdn.com/portrait/82481466_30x30"
                        }
                    ],
                    "resource_key": "23b7a8a1f898967546b234909f0ed2aea27adf3f",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 0
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "aa50fecd567506741ffb60d9368cacf12bd9c8dd",
                "account": "free"
            },
            "tags": [],
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 100,
                        "height": 75,
                        "link": "https://i.vimeocdn.com/video/default_100x75?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/channel/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/channel/default_980x250"
                    }
                ],
                "resource_key": "7637bfefhb474822d326acc5sdfdsf",
                "default_picture": True
            },
            "privacy": {"view": "users"},
            "categories": [],
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/channels/6466464/users",
                        "options": ["GET"],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/channels/6466464/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "privacy_users": {
                        "uri": "/channels/6466464/privacy/users",
                        "options": ["GET", "PUT"],
                        "total": 0
                    }
                },
                "interactions": {
                    "add_moderators": {
                        "uri": "/channels/6466464/moderators",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    },
                    "follow": {
                        "added": "false",
                        "added_time": None,
                        "type": None,
                        "uri": "/users/646646464/channels/6466464"
                    },
                    "moderate_videos": {
                        "uri": "/channels/6466464/videos",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    }
                }
            },
            "resource_key": "hfe487rbfddddd33dddd3553fff33"
        },
            "status_code": 200}
        update_channel_mock.return_value = response
        channel_id = 6466464
        data = {
            "description": "new channel updated",
            "link": "https://api.com",
            "name": "new channel",
            "privacy": "anybody"
        }
        response = self.client.patch(reverse('video_uploader_service-update-channel', args=(channel_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_channel_mock.called_once()
        update_channel_mock.called_once_with(channel_id='6466464', payload=data, query_params={})

    def test_update_channel_with_empty_data(self):
        channel_id = 6466464
        data = {}
        response = self.client.patch(reverse('video_uploader_service-update-channel', args=(channel_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.channel_list')
    def test_channel_list(self, channel_list_mock):
        response = {"data": {
            "total": 1474702,
            "page": 1,
            "per_page": 1,
            "paging": {
                "next": "/channels?page=2&per_page=1",
                "previous": None,
                "first": "/channels?page=1&per_page=1",
                "last": "/channels?page=1474702&per_page=1"
            },
            "uri": "/channels/6466464",
            "name": "new channel",
            "description": "new channel updated",
            "link": "https://vimeo.com/channels/6466464",
            "created_time": "2023-01-27T11:38:55+00:00",
            "modified_time": "2023-01-27T11:39:53+00:00",
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [
                        {
                            "width": 30,
                            "height": 30,
                            "link": "https://i.vimeocdn.com/portrait/82481466_30x30"
                        }
                    ],
                    "resource_key": "46b234909f0ed2aea27adf3f23b7a8a1f8989675",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 0
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "b60d9368cacf12bd9c8ddaa50fecd567506741ff",
                "account": "free"
            },
            "tags": [],
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 100,
                        "height": 75,
                        "link": "https://i.vimeocdn.com/video/default_100x75?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6f613fd22352458c1011f6c43a18bb0551d7e84",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/channel/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/channel/default_980x250"
                    }
                ],
                "resource_key": "2d326acc5bef3bfcb11f7c0555cae2de710dd782",
                "default_picture": True
            },
            "privacy": {"view": "users"},
            "categories": [],
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/channels/6466464/users",
                        "options": ["GET"],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/channels/6466464/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "privacy_users": {
                        "uri": "/channels/6466464/privacy/users",
                        "options": ["GET", "PUT"],
                        "total": 0
                    }
                },
                "interactions": {
                    "add_moderators": {
                        "uri": "/channels/6466464/moderators",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    },
                    "follow": {
                        "added": "false",
                        "added_time": None,
                        "type": None,
                        "uri": "/users/646646464/channels/6466464"
                    },
                    "moderate_videos": {
                        "uri": "/channels/6466464/videos",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    }
                }
            },
            "resource_key": "5da0f8d9694896dbcc9c3a0e5b1ceae80371cf82"
        },
            "status_code": 200}
        channel_list_mock.return_value = response
        response = self.client.get(reverse('video_uploader_service-channel-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        channel_list_mock.called_once()
        channel_list_mock.called_once_with(query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_channel')
    def test_specific_channel(self, specific_channel_mock):
        response = {"data": {
            "uri": "/channels/6466464",
            "name": "new channel",
            "description": "new channel updated",
            "link": "https://vimeo.com/channels/6466464",
            "created_time": "2023-01-27T11:38:55+00:00",
            "modified_time": "2023-01-27T11:39:53+00:00",
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [
                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/82481466_360x360"
                        }
                    ],
                    "resource_key": "23b7a8a1f898967546b234909f0ed2aea27adf3f",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 0
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "aa50fecd567506741ffb60d9368cacf12bd9c8dd",
                "account": "free"
            },
            "tags": [],
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/channel/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/channel/default_980x250"
                    }
                ],
                "resource_key": "2d326acc5bef3bfcb11f7c0555cae2de710dd782",
                "default_picture": True
            },
            "privacy": {"view": "users"},
            "categories": [],
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/channels/6466464/users",
                        "options": ["GET"],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/channels/6466464/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "privacy_users": {
                        "uri": "/channels/6466464/privacy/users",
                        "options": ["GET", "PUT"],
                        "total": 0
                    }
                },
                "interactions": {
                    "add_moderators": {
                        "uri": "/channels/6466464/moderators",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    },
                    "follow": {
                        "added": "false",
                        "added_time": None,
                        "type": None,
                        "uri": "/users/646646464/channels/6466464"
                    },
                    "moderate_videos": {
                        "uri": "/channels/6466464/videos",
                        "options": [
                            "DELETE",
                            "GET",
                            "PUT"
                        ]
                    }
                }
            },
            "resource_key": "5da0f8d9694896dbcc9c3a0e5b1ceae80371cf82"
        },
            "status_code": 200}
        specific_channel_mock.return_value = response
        channel_id = 6466464
        response = self.client.get(reverse('video_uploader_service-specific-channel', args=(channel_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specific_channel_mock.called_once()
        specific_channel_mock.called_once_with(channel_id='6466464', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_channel')
    def test_specific_channel_with_wrong_id(self, specific_channel_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        specific_channel_mock.return_value = response
        channel_id = 6466464
        response = self.client.get(reverse('video_uploader_service-specific-channel', args=(channel_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_channel_mock.called_once()
        specific_channel_mock.called_once_with(channel_id='6466464', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_group')
    def test_create_group_with_no_create_scope(self, create_group_mock):
        response = {'data': {'error': 'Your access token does not have the "create" scope'}, 'status_code': 403}
        create_group_mock.return_value = response
        data = {
            "description": "new group",
            "name": "new group"
        }
        response = self.client.post(reverse('video_uploader_service-create-group'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        create_group_mock.assert_called_once()
        create_group_mock.called_once_with(payload=data)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_group')
    def test_create_group(self, create_group_mock):
        response = {"data": {
            "uri": "/groups/545454",
            "name": "new group",
            "description": "new group",
            "link": "https://vimeo.com/groups/545454",
            "created_time": "2023-01-27T15:18:33+00:00",
            "modified_time": "2023-01-27T15:18:33+00:00",
            "privacy": {
                "view": "anybody",
                "join": "anybody",
                "videos": "all",
                "comment": "all",
                "invite": "members"
            },
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/group/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/group/default_980x250"
                    }
                ],
                "resource_key": "3acb62457d24b09d74a79177929d9638af7afcf2",
                "default_picture": True
            },
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/groups/545454/users",
                        "options": ["GET"],
                        "total": 1
                    },
                    "videos": {
                        "uri": "/groups/545454/videos",
                        "options": ["GET"],
                        "total": 0
                    }
                },
                "interactions": {
                    "join": {
                        "added": True,
                        "added_time": "2023-01-27T15:18:33+00:00",
                        "type": "moderator",
                        "title": None,
                        "uri": "/users/646646464/groups/545454"
                    }
                }
            },
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/82481466_360x360"
                        }
                    ],
                    "resource_key": "23b7a8a1f898967546b234909f0ed2aea27adf3f",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 1
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 3
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 2
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "aa50fecd567506741ffb60d9368cacf12bd9c8dd",
                "account": "free"
            },
            "resource_key": "40d8437671241c86263204f4d2638d89cca4f129"
        }, "status_code": 200}
        create_group_mock.return_value = response
        data = {
            "description": "new group",
            "name": "new group"
        }
        response = self.client.post(reverse('video_uploader_service-create-group'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_group_mock.called_once()
        create_group_mock.called_once_with(payload=data)

    def test_create_group_with_empty_data(self):
        data = {}
        response = self.client.post(reverse('video_uploader_service-create-group'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.groups_list')
    def test_group_list(self, group_list_mock):
        response = {'data': {
            "total": 600464,
            "page": 1,
            "per_page": 1,
            "paging": {
                "next": "/groups?page=2&per_page=1",
                "previous": None,
                "first": "/groups?page=1&per_page=1",
                "last": "/groups?page=600464&per_page=1"
            },
            "data": [
                {
                    "uri": "/groups/808731",
                    "name": "Photography",
                    "description": None,
                    "link": "https://vimeo.com/groups/808731",
                    "created_time": "2023-01-27T15:38:54+00:00",
                    "modified_time": "2023-01-27T15:38:54+00:00",
                    "privacy": {
                        "view": "anybody",
                        "join": "anybody",
                        "videos": "all",
                        "comment": "all",
                        "invite": "members"
                    },
                    "pictures": {
                        "uri": "/videos/149779134/pictures/567891435",
                        "active": True,
                        "type": "custom",
                        "base_link": "https://i.vimeocdn.com/video/545454-asvdw3fedvhgdah3rdeagd33fdf3f3rer3er3er63er",
                        "sizes": [
                            {
                                "width": 100,
                                "height": 75,
                                "link": "https://i.vimeocdn.com/video/545454-asvdw3fedvhgdah3rdeagd33fdf3f3rer3er3er63er_100x75?r=pad",
                                "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F545454-asvdw3fedvhgdah3rdeagd33fdf3f3rer3er3er63er_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                            }
                        ],
                        "resource_key": "608f7de73f7fe88b783b9c437d8e7800b0689d04",
                        "default_picture": "false"
                    },
                    "header": {
                        "uri": None,
                        "active": "false",
                        "type": "default",
                        "base_link": "https://i.vimeocdn.com/group/default",
                        "sizes": [
                            {
                                "width": 980,
                                "height": 250,
                                "link": "https://i.vimeocdn.com/group/default_980x250"
                            }
                        ],
                        "resource_key": "3acb62457d24b09d74a79177929d9638af7afcf2",
                        "default_picture": True
                    },
                    "metadata": {
                        "connections": {
                            "users": {
                                "uri": "/groups/808731/users",
                                "options": ["GET"],
                                "total": 1
                            },
                            "videos": {
                                "uri": "/groups/808731/videos",
                                "options": ["GET"],
                                "total": 1
                            }
                        },
                        "interactions": {
                            "join": {
                                "added": "false",
                                "added_time": None,
                                "type": None,
                                "title": None,
                                "uri": "/users/56789943/groups/808731"
                            }
                        }
                    },
                    "user": {
                        "uri": "/users/98989898",
                        "name": "Henrique J. T. Neves",
                        "link": "https://vimeo.com/user98989898",
                        "capabilities": {
                            "hasLiveSubscription": "false",
                            "hasEnterpriseLihp": "false",
                            "hasSvvTimecodedComments": "false",
                            "hasSimplifiedEnterpriseAccount": "false"
                        },
                        "location": "",
                        "gender": "",
                        "bio": None,
                        "short_bio": None,
                        "created_time": "2022-02-01T18:58:49+00:00",
                        "pictures": {
                            "uri": "/users/98989898/pictures/66548956",
                            "active": True,
                            "type": "custom",
                            "base_link": "https://i.vimeocdn.com/portrait/66548956",
                            "sizes": [
                                {
                                    "width": 30,
                                    "height": 30,
                                    "link": "https://i.vimeocdn.com/portrait/66548956_30x30"
                                }
                            ],
                            "resource_key": "a6d6c74676c9338af078b765ca954f3dfc58f003",
                            "default_picture": "false"
                        },
                        "websites": [],
                        "metadata": {
                            "connections": {
                                "albums": {
                                    "uri": "/users/98989898/albums",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "appearances": {
                                    "uri": "/users/98989898/appearances",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "channels": {
                                    "uri": "/users/98989898/channels",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "feed": {
                                    "uri": "/users/98989898/feed",
                                    "options": ["GET"]
                                },
                                "followers": {
                                    "uri": "/users/98989898/followers",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "following": {
                                    "uri": "/users/98989898/following",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "groups": {
                                    "uri": "/users/98989898/groups",
                                    "options": ["GET"],
                                    "total": 1
                                },
                                "likes": {
                                    "uri": "/users/98989898/likes",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "membership": {
                                    "uri": "/users/98989898/membership/",
                                    "options": ["PATCH"]
                                },
                                "moderated_channels": {
                                    "uri": "/users/98989898/channels?filter=moderated",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "portfolios": {
                                    "uri": "/users/98989898/portfolios",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "videos": {
                                    "uri": "/users/98989898/videos",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "shared": {
                                    "uri": "/users/98989898/shared/videos",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "pictures": {
                                    "uri": "/users/98989898/pictures",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 1
                                },
                                "folders_root": {
                                    "uri": "/users/98989898/folders/root",
                                    "options": ["GET"]
                                },
                                "teams": {
                                    "uri": "/users/98989898/teams",
                                    "options": ["GET"],
                                    "total": 1
                                }
                            },
                            "interactions": {
                                "follow": {
                                    "added": "false",
                                    "added_time": None,
                                    "uri": "/users/56789943/following/98989898",
                                    "options": [
                                        "GET",
                                        "PUT",
                                        "DELETE"
                                    ]
                                },
                                "block": {
                                    "uri": "/me/block/98989898",
                                    "options": [
                                        "PUT",
                                        "DELETE"
                                    ],
                                    "added": "false",
                                    "added_time": None
                                },
                                "report": {
                                    "uri": "/users/98989898/report",
                                    "options": ["POST"],
                                    "reason": [
                                        "inappropriate avatar",
                                        "spammy",
                                        "bad videos",
                                        "creepy",
                                        "not playing nice",
                                        "impersonation",
                                        "inappropriate job post"
                                    ]
                                }
                            }
                        },
                        "location_details": {
                            "formatted_address": "",
                            "latitude": None,
                            "longitude": None,
                            "city": None,
                            "state": None,
                            "neighborhood": None,
                            "sub_locality": None,
                            "state_iso_code": None,
                            "country": None,
                            "country_iso_code": None
                        },
                        "skills": [],
                        "available_for_hire": "false",
                        "can_work_remotely": "false",
                        "resource_key": "39d41f2268c859e35cdd858c6d6d405366ab01bb",
                        "account": "basic"
                    },
                    "resource_key": "fd0e2c2a4030ce18ef927a811be32ea0cc68b382"
                }
            ]
        }, 'status_code': 200}
        group_list_mock.return_value = response
        response = self.client.get(reverse('video_uploader_service-group-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        group_list_mock.assert_called_once()
        group_list_mock.assert_called_once_with(query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_group')
    def test_delete_group(self, delete_group_mock):
        response = {'data': {"message": "Item deleted successfully."}, 'status_code': 204}
        delete_group_mock.return_value = response
        group_id = 808731
        response = self.client.delete(reverse('video_uploader_service-delete-group', args=(group_id,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_group_mock.assert_called_once()
        delete_group_mock.assert_called_once_with(group_id='808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_group')
    def test_delete_group_with_invalid_id(self, delete_group_mock):
        response = {'data': {"message": "Resource not found"}, 'status_code': 404}
        delete_group_mock.return_value = response
        group_id = 808731
        response = self.client.delete(reverse('video_uploader_service-delete-group', args=(group_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_group_mock.assert_called_once()
        delete_group_mock.assert_called_once_with(group_id='808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_group')
    def test_delete_group_with_no_delete_scope(self, delete_group_mock):
        response = {'data': {'error': 'Your access token does not have the "delete" scope'}, 'status_code': 403}
        delete_group_mock.return_value = response
        group_id = 808731
        response = self.client.delete(reverse('video_uploader_service-delete-group', args=(group_id,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_group_mock.assert_called_once()
        delete_group_mock.assert_called_once_with(group_id='808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_group')
    def test_specific_group_with_invalid_id(self, specific_group_mock):
        response = {'data': {"message": "Resource not found"}, 'status_code': 404}
        specific_group_mock.return_value = response
        group_id = 808731
        response = self.client.get(reverse('video_uploader_service-specific-group', args=(group_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_group_mock.assert_called_once()
        specific_group_mock.assert_called_once_with(group_id='808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_group')
    def test_specific_group(self, specific_group_mock):
        response = {'data': {
            "uri": "/groups/545454",
            "name": "new group",
            "description": "new group",
            "link": "https://vimeo.com/groups/545454",
            "created_time": "2023-01-27T15:18:33+00:00",
            "modified_time": "2023-01-27T15:18:33+00:00",
            "privacy": {
                "view": "anybody",
                "join": "anybody",
                "videos": "all",
                "comment": "all",
                "invite": "members"
            },
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "header": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/group/default",
                "sizes": [
                    {
                        "width": 980,
                        "height": 250,
                        "link": "https://i.vimeocdn.com/group/default_980x250"
                    }
                ],
                "resource_key": "3acb62457d24b09d74a79177929d9638af7afcf2",
                "default_picture": True
            },
            "metadata": {
                "connections": {
                    "users": {
                        "uri": "/groups/545454/users",
                        "options": ["GET"],
                        "total": 1
                    },
                    "videos": {
                        "uri": "/groups/545454/videos",
                        "options": ["GET"],
                        "total": 0
                    }
                },
                "interactions": {
                    "join": {
                        "added": True,
                        "added_time": "2023-01-27T15:18:33+00:00",
                        "type": "moderator",
                        "title": None,
                        "uri": "/users/646646464/groups/545454"
                    }
                }
            },
            "user": {
                "uri": "/users/646646464",
                "name": "John alex",
                "link": "https://vimeo.com/user646646464",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-25T06:10:46+00:00",
                "pictures": {
                    "uri": "/users/646646464/pictures/82481466",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/82481466",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/82481466_360x360"
                        }
                    ],
                    "resource_key": "23b7a8a1f898967546b234909f0ed2aea27adf3f",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/646646464/albums",
                            "options": ["GET"],
                            "total": 0
                        },
                        "appearances": {
                            "uri": "/users/646646464/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/646646464/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/646646464/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/646646464/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/646646464/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/646646464/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/646646464/groups",
                            "options": ["GET"],
                            "total": 1
                        },
                        "likes": {
                            "uri": "/users/646646464/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/646646464/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/646646464/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/646646464/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/646646464/videos",
                            "options": ["GET"],
                            "total": 3
                        },
                        "watchlater": {
                            "uri": "/users/646646464/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/646646464/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/646646464/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/646646464/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/646646464/folders",
                            "options": ["GET", "POST"],
                            "total": 2
                        },
                        "teams": {
                            "uri": "/users/646646464/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-25T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "aa50fecd567506741ffb60d9368cacf12bd9c8dd",
                "account": "free"
            },
            "resource_key": "40d8437671241c86263204f4d2638d89cca4f129"
        }, 'status_code': 200}
        specific_group_mock.return_value = response
        group_id = 808731
        response = self.client.get(reverse('video_uploader_service-specific-group', args=(group_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specific_group_mock.assert_called_once()
        specific_group_mock.assert_called_once_with(group_id='808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_user_to_group')
    def test_add_user_to_group(self, add_user_to_group_mock):
        response = {'status_code': 200}
        add_user_to_group_mock.return_value = response
        group_id = 808731
        user_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-user-to-group', args=(group_id, user_id)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        add_user_to_group_mock.assert_called_once()
        add_user_to_group_mock.assert_called_once_with(group_id='808731', user_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_user_to_group')
    def test_add_user_to_group_with_invalid_user_id(self, add_user_to_group_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_user_to_group_mock.return_value = response
        group_id = 808731
        user_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-user-to-group', args=(group_id, user_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_user_to_group_mock.assert_called_once()
        add_user_to_group_mock.assert_called_once_with(group_id='808731', user_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_user_to_group')
    def test_add_user_to_group_with_invalid_group_id(self, add_user_to_group_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_user_to_group_mock.return_value = response
        group_id = 808731
        user_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-user-to-group', args=(group_id, user_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_user_to_group_mock.assert_called_once()
        add_user_to_group_mock.assert_called_once_with(group_id='808731', user_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_user_to_group')
    def test_add_user_to_group_with_no_add_scope(self, add_user_to_group_mock):
        response = {'data': {'error': 'Your access token does not have the "add" scope'}, 'status_code': 403}
        add_user_to_group_mock.return_value = response
        group_id = 808731
        user_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-user-to-group', args=(group_id, user_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        add_user_to_group_mock.assert_called_once()
        add_user_to_group_mock.assert_called_once_with(group_id='808731', user_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_group')
    def test_add_video_to_group(self, add_video_to_group_mock):
        response = {'status_code': 200}
        add_video_to_group_mock.return_value = response
        group_id = 808731
        video_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-video-to-group', args=(group_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        add_video_to_group_mock.assert_called_once()
        add_video_to_group_mock.assert_called_once_with(group_id='808731', video_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_group')
    def test_add_video_to_group_with_invalid_group_id(self, add_video_to_group_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_video_to_group_mock.return_value = response
        group_id = 808731
        video_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-video-to-group', args=(group_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_group_mock.assert_called_once()
        add_video_to_group_mock.assert_called_once_with(group_id='808731', video_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_group')
    def test_add_video_to_group_with_invalid_video_id(self, add_video_to_group_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_video_to_group_mock.return_value = response
        group_id = 808731
        video_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-video-to-group', args=(group_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_group_mock.assert_called_once()
        add_video_to_group_mock.assert_called_once_with(group_id='808731', video_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_group')
    def test_add_video_to_group_with_no_add_scope(self, add_video_to_group_mock):
        response = {'data': {'error': 'Your access token does not have the "add" scope'}, 'status_code': 403}
        add_video_to_group_mock.return_value = response
        group_id = 808731
        video_id = 19808731
        response = self.client.put(reverse('video_uploader_service-add-video-to-group', args=(group_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        add_video_to_group_mock.assert_called_once()
        add_video_to_group_mock.assert_called_once_with(group_id='808731', video_id='19808731', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_showcase')
    def test_create_showcase_with_no_create_scope(self, create_showcase_mock):
        response = {'data': {'error': 'Your access token does not have the "create" scope'}, 'status_code': 403}
        create_showcase_mock.return_value = response
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark"
        }
        user_id = 44367021
        response = self.client.post(reverse('video_uploader_service-create-showcase', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        create_showcase_mock.assert_called_once()
        create_showcase_mock.assert_called_once_with(user_id='44367021', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_showcase')
    def test_create_showcase(self, create_showcase_mock):
        response = {"data": {
            "uri": "/users/56789943/albums/12345678",
            "name": "Google",
            "description": None,
            "link": "https://vimeo.com/showcase/12345678",
            "duration": 0,
            "created_time": "2023-01-27T16:43:06+00:00",
            "modified_time": "2023-01-27T16:43:06+00:00",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [
                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": ["GET"],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": ["GET"],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "privacy": {"view": "anybody"},
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "sort": "arranged",
            "layout": "grid",
            "theme": "standard",
            "brand_color": None,
            "custom_logo": None,
            "review_mode": "false",
            "web_custom_logo": "false",
            "web_brand_color": "false",
            "allow_downloads": "false",
            "allow_continuous_play": True,
            "allow_share": True,
            "hide_nav": "false",
            "metadata": {
                "connections": {
                    "videos": {
                        "uri": "/albums/12345678/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "available_videos": {
                        "uri": "/users/56789943/albums/12345678/available_videos",
                        "options": ["GET"],
                        "total": 1
                    }
                },
                "interactions": {
                    "add_custom_thumbnails": {
                        "uri": "/users/56789943/albums/12345678/custom_thumbnails",
                        "options": ["GET", "POST"]
                    },
                    "add_logos": {
                        "uri": "/users/56789943/albums/12345678/logos",
                        "options": ["GET", "POST"]
                    },
                    "add_videos": {
                        "uri": "/users/56789943/albums/12345678/videos",
                        "options": ["GET", "PUT"]
                    }
                }
            },
            "use_custom_domain": "false",
            "domain": None,
            "domain_certificate_state": None,
            "url": None,
            "hide_vimeo_logo": None,
            "embed_custom_logo": None,
            "embed_brand_color": None,
            "autoplay": "false",
            "loop": "false",
            "roku_provider_name": None,
            "roku_language": None,
            "roku_genres": [""],
            "share_link": "https://vimeo.com/showcase/12345678",
            "hide_upcoming": "false",
            "seo_title": None,
            "seo_description": None,
            "seo_allow_indexed": "false",
            "seo_keywords": [],
            "hide_from_vimeo": "false",
            "embed": {"html": None},
            "resource_key": "20075f92bbd20f7125b0f699f8287e43ae17b0f2"
        }, 'status_code': 201}
        create_showcase_mock.return_value = response
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark"
        }
        user_id = 44367021
        response = self.client.post(reverse('video_uploader_service-create-showcase', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_showcase_mock.assert_called_once()
        create_showcase_mock.assert_called_once_with(user_id='44367021', payload=data, query_params={})

    def test_create_showcase_with_invalid_data(self):
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark"
        }
        user_id = 44367021
        response = self.client.post(reverse('video_uploader_service-create-showcase', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_showcase')
    def test_delete_showcase(self, delete_showcase_mock):
        response = {"data": {"message": "Item deleted successfully."}, 'status_code': 204}
        delete_showcase_mock.return_value = response
        user_id = 44367021
        album_id = 47612
        response = self.client.delete(reverse('video_uploader_service-delete-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_showcase_mock.assert_called_once()
        delete_showcase_mock.assert_called_once_with(user_id='44367021', album_id='47612', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_showcase')
    def test_delete_showcase_with_invalid_id(self, delete_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        delete_showcase_mock.return_value = response
        user_id = 44367021
        album_id = 47612
        response = self.client.delete(reverse('video_uploader_service-delete-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_showcase_mock.assert_called_once()
        delete_showcase_mock.assert_called_once_with(user_id='44367021', album_id='47612', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_showcase')
    def test_delete_showcase_with_no_delete_scope(self, delete_showcase_mock):
        response = {'data': {'error': 'Your access token does not have the "delete" scope'}, 'status_code': 403}
        delete_showcase_mock.return_value = response
        user_id = 44367021
        album_id = 47612
        response = self.client.delete(reverse('video_uploader_service-delete-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_showcase_mock.assert_called_once()
        delete_showcase_mock.assert_called_once_with(user_id='44367021', album_id='47612', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_showcase')
    def test_update_showcase_with_no_edit_scope(self, update_showcase_mock):
        response = {'data': {'error': 'Your access token does not have the "edit" scope'}, 'status_code': 403}
        update_showcase_mock.return_value = response
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark",
            "url": "https://api.com",
            "use_custom_domain": True
        }
        user_id = 56789943
        album_id = 12345678
        response = self.client.patch(reverse('video_uploader_service-update-showcase', args=(user_id, album_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        update_showcase_mock.assert_called_once()
        update_showcase_mock.assert_called_once_with(user_id='56789943', album_id='12345678', payload=data,
                                                     query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_showcase')
    def test_update_showcase(self, update_showcase_mock):
        response = {"data": {
            "uri": "/users/56789943/albums/12345678",
            "name": "Google",
            "description": None,
            "link": "https://vimeo.com/showcase/12345678",
            "duration": 0,
            "created_time": "2023-01-27T16:43:06+00:00",
            "modified_time": "2023-01-27T16:43:06+00:00",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": ["GET"],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": ["GET"],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "privacy": {"view": "anybody"},
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "sort": "arranged",
            "layout": "grid",
            "theme": "standard",
            "brand_color": None,
            "custom_logo": None,
            "review_mode": "false",
            "web_custom_logo": "false",
            "web_brand_color": "false",
            "allow_downloads": "false",
            "allow_continuous_play": True,
            "allow_share": True,
            "hide_nav": "false",
            "metadata": {
                "connections": {
                    "videos": {
                        "uri": "/albums/12345678/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "available_videos": {
                        "uri": "/users/56789943/albums/12345678/available_videos",
                        "options": ["GET"],
                        "total": 1
                    }
                },
                "interactions": {
                    "add_custom_thumbnails": {
                        "uri": "/users/56789943/albums/12345678/custom_thumbnails",
                        "options": ["GET", "POST"]
                    },
                    "add_logos": {
                        "uri": "/users/56789943/albums/12345678/logos",
                        "options": ["GET", "POST"]
                    },
                    "add_videos": {
                        "uri": "/users/56789943/albums/12345678/videos",
                        "options": ["GET", "PUT"]
                    }
                }
            },
            "use_custom_domain": "false",
            "domain": None,
            "domain_certificate_state": None,
            "url": None,
            "hide_vimeo_logo": None,
            "embed_custom_logo": None,
            "embed_brand_color": None,
            "autoplay": "false",
            "loop": "false",
            "roku_provider_name": None,
            "roku_language": None,
            "roku_genres": [""],
            "share_link": "https://vimeo.com/showcase/12345678",
            "hide_upcoming": "false",
            "seo_title": None,
            "seo_description": None,
            "seo_allow_indexed": "false",
            "seo_keywords": [],
            "hide_from_vimeo": "false",
            "embed": {"html": None},
            "resource_key": "20075f92bbd20f7125b0f699f8287e43ae17b0f2"
        }, 'status_code': 200}
        update_showcase_mock.return_value = response
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark",
            "url": "https://api.com",
            "use_custom_domain": True
        }
        user_id = 56789943
        album_id = 12345678
        response = self.client.patch(reverse('video_uploader_service-update-showcase', args=(user_id, album_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_showcase_mock.assert_called_once()
        update_showcase_mock.assert_called_once_with(user_id='56789943', album_id='12345678', payload=data,
                                                     query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_showcase')
    def test_update_showcase_with_invalid_id(self, update_showcase_mock):
        response = {"data": {"message": "Resource not found"},
                    'status_code': 404}
        update_showcase_mock.return_value = response
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark",
            "url": "https://api.com",
            "use_custom_domain": True
        }
        user_id = 56789943
        album_id = 12345678
        response = self.client.patch(reverse('video_uploader_service-update-showcase', args=(user_id, album_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_showcase_mock.assert_called_once()
        update_showcase_mock.assert_called_once_with(user_id='56789943', album_id='12345678', payload=data,
                                                     query_params={})

    def test_update_showcase_with_invalid_data(self):
        data = {
            "brand_color": "blue",
            "description": "this is description",
            "hide_nav": True,
            "hide_upcoming": True,
            "layout": "grid",
            "name": "string",
            "password": "password",
            "privacy": "anybody",
            "review_mode": True,
            "sort": "added_first",
            "theme": "dark",
            "url": "https:/api.com",
            "use_custom_domain": True
        }
        user_id = 56789943
        album_id = 12345678
        response = self.client.patch(reverse('video_uploader_service-update-showcase', args=(user_id, album_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.showcase_list')
    def test_showcase_list(self, showcase_list_mock):
        response = {"data": {
            "total": 2,
            "page": 1,
            "per_page": 1,
            "paging": {
                "next": "/users/56789943/albums?page=2&per_page=1",
                "previous": None,
                "first": "/users/56789943/albums?page=1&per_page=1",
                "last": "/users/56789943/albums?page=2&per_page=1"
            },
            "data": [
                {
                    "uri": "/users/56789943/albums/12345678",
                    "name": "Google",
                    "description": None,
                    "link": "https://vimeo.com/showcase/12345678",
                    "duration": 0,
                    "created_time": "2023-01-27T16:43:06+00:00",
                    "modified_time": "2023-01-27T16:43:06+00:00",
                    "user": {
                        "uri": "/users/56789943",
                        "name": "test user",
                        "link": "https://vimeo.com/user56789943",
                        "capabilities": {
                            "hasLiveSubscription": "false",
                            "hasEnterpriseLihp": "false",
                            "hasSvvTimecodedComments": "false",
                            "hasSimplifiedEnterpriseAccount": "false"
                        },
                        "location": "",
                        "gender": "",
                        "bio": None,
                        "short_bio": None,
                        "created_time": "2023-01-24T06:34:04+00:00",
                        "pictures": {
                            "uri": "/users/56789943/pictures/12345678",
                            "active": True,
                            "type": "custom",
                            "base_link": "https://i.vimeocdn.com/portrait/12345678",
                            "sizes": [

                                {
                                    "width": 360,
                                    "height": 360,
                                    "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                                }
                            ],
                            "resource_key": "a72e52d68f861840c903170313586611527e4906",
                            "default_picture": "false"
                        },
                        "websites": [],
                        "metadata": {
                            "connections": {
                                "albums": {
                                    "uri": "/users/56789943/albums",
                                    "options": ["GET"],
                                    "total": 2
                                },
                                "appearances": {
                                    "uri": "/users/56789943/appearances",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "categories": {
                                    "uri": "/users/56789943/categories",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "channels": {
                                    "uri": "/users/56789943/channels",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "feed": {
                                    "uri": "/users/56789943/feed",
                                    "options": ["GET"]
                                },
                                "followers": {
                                    "uri": "/users/56789943/followers",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "following": {
                                    "uri": "/users/56789943/following",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "groups": {
                                    "uri": "/users/56789943/groups",
                                    "options": ["GET"],
                                    "total": 3
                                },
                                "likes": {
                                    "uri": "/users/56789943/likes",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "membership": {
                                    "uri": "/users/56789943/membership/",
                                    "options": ["PATCH"]
                                },
                                "moderated_channels": {
                                    "uri": "/users/56789943/channels?filter=moderated",
                                    "options": ["GET"],
                                    "total": 1
                                },
                                "portfolios": {
                                    "uri": "/users/56789943/portfolios",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "videos": {
                                    "uri": "/users/56789943/videos",
                                    "options": ["GET"],
                                    "total": 1
                                },
                                "watchlater": {
                                    "uri": "/users/56789943/watchlater",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "shared": {
                                    "uri": "/users/56789943/shared/videos",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "pictures": {
                                    "uri": "/users/56789943/pictures",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 1
                                },
                                "watched_videos": {
                                    "uri": "/me/watched/videos",
                                    "options": ["GET"],
                                    "total": 0
                                },
                                "folders_root": {
                                    "uri": "/users/56789943/folders/root",
                                    "options": ["GET"]
                                },
                                "folders": {
                                    "uri": "/users/56789943/folders",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 1
                                },
                                "teams": {
                                    "uri": "/users/56789943/teams",
                                    "options": ["GET"],
                                    "total": 1
                                },
                                "block": {
                                    "uri": "/me/block",
                                    "options": ["GET"],
                                    "total": 0
                                }
                            }
                        },
                        "location_details": {
                            "formatted_address": "",
                            "latitude": None,
                            "longitude": None,
                            "city": None,
                            "state": None,
                            "neighborhood": None,
                            "sub_locality": None,
                            "state_iso_code": None,
                            "country": None,
                            "country_iso_code": None
                        },
                        "skills": [],
                        "available_for_hire": "false",
                        "can_work_remotely": "false",
                        "preferences": {
                            "videos": {
                                "rating": ["unrated"],
                                "privacy": {
                                    "view": "anybody",
                                    "comments": "anybody",
                                    "embed": "public",
                                    "download": True,
                                    "add": True,
                                    "allow_share_link": True
                                }
                            },
                            "webinar_registrant_lower_watermark_banner_dismissed": []
                        },
                        "content_filter": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "safe",
                            "unrated"
                        ],
                        "upload_quota": {
                            "space": {
                                "free": 1,
                                "max": 2,
                                "used": 1,
                                "showing": "periodic",
                                "unit": "video_count"
                            },
                            "periodic": {
                                "period": "month",
                                "unit": "video_count",
                                "free": 1,
                                "max": 2,
                                "used": 1,
                                "reset_date": "2023-02-24T00:00:00-05:00"
                            },
                            "lifetime": {
                                "unit": "video_count",
                                "free": 24,
                                "max": 25,
                                "used": 1
                            }
                        },
                        "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                        "account": "free"
                    },
                    "privacy": {"view": "anybody"},
                    "pictures": {
                        "uri": None,
                        "active": "false",
                        "type": "default",
                        "base_link": "https://i.vimeocdn.com/video/default",
                        "sizes": [
                            {
                                "width": 100,
                                "height": 75,
                                "link": "https://i.vimeocdn.com/video/default_100x75?r=pad",
                                "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi"
                                                         ".vimeocdn.com%2Fvideo%2Fdefault_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages"
                                                         "%2Fcrawler_play.png"
                            }
                        ],
                        "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                        "default_picture": True
                    },
                    "sort": "arranged",
                    "layout": "grid",
                    "theme": "standard",
                    "brand_color": None,
                    "custom_logo": None,
                    "review_mode": "false",
                    "web_custom_logo": "false",
                    "web_brand_color": "false",
                    "allow_downloads": "false",
                    "allow_continuous_play": True,
                    "allow_share": True,
                    "hide_nav": "false",
                    "metadata": {
                        "connections": {
                            "videos": {
                                "uri": "/albums/12345678/videos",
                                "options": ["GET"],
                                "total": 0
                            },
                            "available_videos": {
                                "uri": "/users/56789943/albums/12345678/available_videos",
                                "options": ["GET"],
                                "total": 1
                            }
                        },
                        "interactions": {
                            "add_custom_thumbnails": {
                                "uri": "/users/56789943/albums/12345678/custom_thumbnails",
                                "options": ["GET", "POST"]
                            },
                            "add_logos": {
                                "uri": "/users/56789943/albums/12345678/logos",
                                "options": ["GET", "POST"]
                            },
                            "add_videos": {
                                "uri": "/users/56789943/albums/12345678/videos",
                                "options": ["GET", "PUT"]
                            }
                        }
                    },
                    "use_custom_domain": "false",
                    "domain": None,
                    "domain_certificate_state": None,
                    "url": None,
                    "hide_vimeo_logo": None,
                    "embed_custom_logo": None,
                    "embed_brand_color": None,
                    "autoplay": "false",
                    "loop": "false",
                    "roku_provider_name": None,
                    "roku_language": None,
                    "roku_genres": [""],
                    "share_link": "https://vimeo.com/showcase/12345678",
                    "hide_upcoming": "false",
                    "seo_title": None,
                    "seo_description": None,
                    "seo_allow_indexed": "false",
                    "seo_keywords": [],
                    "hide_from_vimeo": "false",
                    "embed": {"html": None},
                    "resource_key": "20075f92bbd20f7125b0f699f8287e43ae17b0f2"
                }
            ]
        }, 'status_code': 200}
        showcase_list_mock.return_value = response
        user_id = 56789943
        response = self.client.get(reverse('video_uploader_service-showcase-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        showcase_list_mock.assert_called_once()
        showcase_list_mock.assert_called_once_with(user_id='56789943', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.showcase_list')
    def test_showcase_list_with_invalid_user_id(self, showcase_list_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        showcase_list_mock.return_value = response
        user_id = 56789943
        response = self.client.get(reverse('video_uploader_service-showcase-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        showcase_list_mock.assert_called_once()
        showcase_list_mock.assert_called_once_with(user_id='56789943', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_showcase')
    def test_specific_showcase_with_invalid_user_id(self, specific_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        specific_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 12345678
        response = self.client.get(reverse('video_uploader_service-specific-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_showcase_mock.assert_called_once()
        specific_showcase_mock.assert_called_once_with(user_id='93125162', album_id='12345678', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_showcase')
    def test_specific_showcase(self, specific_showcase_mock):
        response = {"data": {
            "uri": "/users/56789943/albums/12345678",
            "name": "Google",
            "description": None,
            "link": "https://vimeo.com/showcase/12345678",
            "duration": 0,
            "created_time": "2023-01-27T16:43:06+00:00",
            "modified_time": "2023-01-27T16:43:06+00:00",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": ["GET"],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": ["GET"],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": ["GET"],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": ["GET"],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": ["GET"]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": ["GET"],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": ["GET"],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": ["GET"],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": ["GET"],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": ["PATCH"]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": ["GET"],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": ["GET"],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": ["GET"],
                            "total": 1
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": ["GET"],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": ["GET"],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": ["GET"]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": ["GET", "POST"],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": ["GET"],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": ["GET"],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": ["unrated"],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 1,
                        "max": 2,
                        "used": 1,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 24,
                        "max": 25,
                        "used": 1
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "privacy": {"view": "anybody"},
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "f6c43a18bb0551d7e84f6f613fd22352458c1011",
                "default_picture": True
            },
            "sort": "arranged",
            "layout": "grid",
            "theme": "standard",
            "brand_color": None,
            "custom_logo": None,
            "review_mode": "false",
            "web_custom_logo": "false",
            "web_brand_color": "false",
            "allow_downloads": "false",
            "allow_continuous_play": True,
            "allow_share": True,
            "hide_nav": "false",
            "metadata": {
                "connections": {
                    "videos": {
                        "uri": "/albums/12345678/videos",
                        "options": ["GET"],
                        "total": 0
                    },
                    "available_videos": {
                        "uri": "/users/56789943/albums/12345678/available_videos",
                        "options": ["GET"],
                        "total": 1
                    }
                },
                "interactions": {
                    "add_custom_thumbnails": {
                        "uri": "/users/56789943/albums/12345678/custom_thumbnails",
                        "options": ["GET", "POST"]
                    },
                    "add_logos": {
                        "uri": "/users/56789943/albums/12345678/logos",
                        "options": ["GET", "POST"]
                    },
                    "add_videos": {
                        "uri": "/users/56789943/albums/12345678/videos",
                        "options": ["GET", "PUT"]
                    }
                }
            },
            "use_custom_domain": "false",
            "domain": None,
            "domain_certificate_state": None,
            "url": None,
            "hide_vimeo_logo": None,
            "embed_custom_logo": None,
            "embed_brand_color": None,
            "autoplay": "false",
            "loop": "false",
            "roku_provider_name": None,
            "roku_language": None,
            "roku_genres": [""],
            "share_link": "https://vimeo.com/showcase/12345678",
            "hide_upcoming": "false",
            "seo_title": None,
            "seo_description": None,
            "seo_allow_indexed": "false",
            "seo_keywords": [],
            "hide_from_vimeo": "false",
            "embed": {"html": None},
            "resource_key": "20075f92bbd20f7125b0f699f8287e43ae17b0f2"
        }, 'status_code': 200}
        specific_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 12345678
        response = self.client.get(reverse('video_uploader_service-specific-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specific_showcase_mock.assert_called_once()
        specific_showcase_mock.assert_called_once_with(user_id='93125162', album_id='12345678', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_showcase')
    def test_specific_showcase_with_invalid_id(self, specific_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        specific_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 12345678
        response = self.client.get(reverse('video_uploader_service-specific-showcase', args=(user_id, album_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_showcase_mock.assert_called_once()
        specific_showcase_mock.assert_called_once_with(user_id='93125162', album_id='12345678', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_showcase')
    def test_add_video_to_showcase_with_invalid_video_id(self, add_video_to_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_video_to_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 12345678
        video_id = 79345428
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-showcase', args=(user_id, album_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_showcase_mock.assert_called_once()
        add_video_to_showcase_mock.assert_called_once_with(video_id='79345428', user_id='93125162', album_id='12345678',
                                                           query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_showcase')
    def test_add_video_to_showcase_with_invalid_user_id(self, add_video_to_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_video_to_showcase_mock.return_value = response
        user_id = 9312516
        album_id = 12345678
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-showcase', args=(user_id, album_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_showcase_mock.assert_called_once()
        add_video_to_showcase_mock.assert_called_once_with(video_id='987654321', user_id='9312516', album_id='12345678',
                                                           query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_showcase')
    def test_add_video_to_showcase_with_invalid_album_id(self, add_video_to_showcase_mock):
        response = {"data": {"message": "Resource not found"}, 'status_code': 404}
        add_video_to_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 1014622
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-showcase', args=(user_id, album_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_showcase_mock.assert_called_once()
        add_video_to_showcase_mock.assert_called_once_with(user_id='93125162', album_id='1014622', video_id='987654321',
                                                           query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_showcase')
    def test_add_video_to_showcase(self, add_video_to_showcase_mock):
        response = {"data": {"message": "The video was added."}, 'status_code': 204}
        add_video_to_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 1014622
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-showcase', args=(user_id, album_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        add_video_to_showcase_mock.assert_called_once()
        add_video_to_showcase_mock.assert_called_once_with(user_id='93125162', album_id='1014622', video_id='987654321',
                                                           query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_showcase')
    def test_add_video_to_showcase_with_no_add_scope(self, add_video_to_showcase_mock):
        response = {'data': {'error': 'Your access token does not have the "add" scope'}, 'status_code': 403}
        add_video_to_showcase_mock.return_value = response
        user_id = 93125162
        album_id = 1014622
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-showcase', args=(user_id, album_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        add_video_to_showcase_mock.assert_called_once()
        add_video_to_showcase_mock.assert_called_once_with(user_id='93125162', album_id='1014622', video_id='987654321',
                                                           query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_video')
    def test_create_video(self, create_video_mock):
        response = {"data": {
            "uri": "/videos/987654321",
            "name": "Untitled",
            "description": None,
            "type": "video",
            "link": "https://vimeo.com/987654321",
            "player_embed_url": "https://player.vimeo.com/video/987654321?h=ed6ba73968",
            "duration": 0,
            "width": 400,
            "language": None,
            "height": 300,
            "embed": {
                "html": "<iframe src=\"https://player.vimeo.com/video/987654321?h=ed6ba73968&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=262102\" width=\"400\" height=\"300\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Untitled\"></iframe>",
                "badges": {
                    "hdr": "false",
                    "live": {
                        "streaming": "false",
                        "archived": "false"
                    },
                    "staff_pick": {
                        "normal": "false",
                        "best_of_the_month": "false",
                        "best_of_the_year": "false",
                        "premiere": "false"
                    },
                    "vod": "false",
                    "weekend_challenge": "false"
                },
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": "false",
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "logos": {
                    "vimeo": True,
                    "custom": {
                        "active": "false",
                        "url": None,
                        "link": None,
                        "use_link": "false",
                        "sticky": "false"
                    }
                },
                "title": {
                    "name": "user",
                    "owner": "user",
                    "portrait": "user"
                },
                "end_screen": [],
                "playbar": True,
                "pip": True,
                "autopip": True,
                "volume": True,
                "color": "00adef",
                "event_schedule": True,
                "interactive": "false",
                "uri": None,
                "speed": True
            },
            "created_time": "2023-01-27T18:50:40+00:00",
            "modified_time": "2023-01-27T18:50:40+00:00",
            "release_time": "2023-01-27T18:50:40+00:00",
            "content_rating": [
                "unrated"
            ],
            "content_rating_class": "unrated",
            "rating_mod_locked": "false",
            "license": None,
            "privacy": {
                "view": "anybody",
                "embed": "public",
                "download": "false",
                "add": True,
                "comments": "anybody"
            },
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [
                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "7a491d0e8cad256a8ac2fd6d207e647c1b034bad",
                "default_picture": True
            },
            "tags": [],
            "stats": {
                "plays": 0
            },
            "categories": [],
            "uploader": {
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [
                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                }
            },
            "metadata": {
                "connections": {
                    "comments": {
                        "uri": "/videos/987654321/comments",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "credits": {
                        "uri": "/videos/987654321/credits",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "likes": {
                        "uri": "/videos/987654321/likes",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "pictures": {
                        "uri": "/videos/987654321/pictures",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "texttracks": {
                        "uri": "/videos/987654321/texttracks",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "related": None,
                    "recommendations": {
                        "uri": "/videos/987654321/recommendations",
                        "options": [
                            "GET"
                        ]
                    },
                    "albums": {
                        "uri": "/videos/987654321/albums",
                        "options": [
                            "GET",
                            "PATCH"
                        ],
                        "total": 0
                    },
                    "available_albums": {
                        "uri": "/videos/987654321/available_albums",
                        "options": [
                            "GET"
                        ],
                        "total": 2
                    },
                    "available_channels": {
                        "uri": "/videos/987654321/available_channels",
                        "options": [
                            "GET"
                        ],
                        "total": 1
                    },
                    "versions": {
                        "uri": "/videos/987654321/versions",
                        "options": [
                            "GET"
                        ],
                        "total": 1,
                        "latest_incomplete_version": None
                    }
                },
                "interactions": {
                    "watchlater": {
                        "uri": "/users/56789943/watchlater/987654321",
                        "options": [
                            "GET",
                            "PUT",
                            "DELETE"
                        ],
                        "added": "false",
                        "added_time": None
                    },
                    "report": {
                        "uri": "/videos/987654321/report",
                        "options": [
                            "POST"
                        ],
                        "reason": [
                            "pornographic",
                            "harassment",
                            "ripoff",
                            "incorrect rating",
                            "spam",
                            "causes harm",
                            "csam"
                        ]
                    },
                    "view_team_members": {
                        "uri": "/videos/987654321/teammembers",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "blocked_fields": [
                            "custom_url"
                        ]
                    },
                    "edit_content_rating": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_rating": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "advertisement",
                            "safe",
                            "unrated"
                        ]
                    },
                    "edit_privacy": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_type": "application/vnd.vimeo.video",
                        "properties": [
                            {
                                "name": "privacy.view",
                                "required": True,
                                "options": [
                                    "anybody",
                                    "nobody",
                                    "password",
                                    "disable",
                                    "unlisted"
                                ]
                            }
                        ]
                    },
                    "delete": {
                        "uri": "/videos/987654321",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "can_update_privacy_to_public": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "trim": {
                        "uri": "/videos/987654321/cliptrim",
                        "options": [
                            "GET",
                            "POST"
                        ]
                    },
                    "validate": {
                        "uri": "/videos/987654321/validate",
                        "options": [
                            "PUT"
                        ]
                    }
                },
                "is_vimeo_create": "false",
                "is_screen_record": "false"
            },
            "manage_link": "/manage/videos/987654321",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "parent_folder": None,
            "last_user_action_event_date": "2023-01-27T18:50:40+00:00",
            "review_page": {
                "active": True,
                "link": "https://vimeo.com/user56789943/review/987654321/dbebc4d84a",
                "is_shareable": True
            },
            "play": {
                "status": "unavailable"
            },
            "app": {
                "name": "saad test app",
                "uri": "/apps/262102"
            },
            "status": "uploading",
            "resource_key": "197ff1e79be5b831717ce6d9d7423ec12312c9ff",
            "upload": {
                "status": "in_progress",
                "upload_link": "https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/e1f714d6198eaedc3f6f8c1a16ced86a",
                "form": None,
                "complete_uri": None,
                "approach": "tus",
                "size": 1040,
                "redirect_url": None,
                "link": None
            },
            "transcode": {
                "status": "in_progress"
            },
            "is_playable": "false",
            "has_audio": "false"
        }, 'status_code': 201}
        create_video_mock.return_value = response
        data = {
            "name": "string",
            "description": "string",
            "upload": {
                "approach": "post",
                "size": "4040",
                "redirect_url": "https://api.com"
            }
        }
        response = self.client.post(reverse('video_uploader_service-create-video'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_video_mock.assert_called_once()
        create_video_mock.assert_called_once_with(payload=data)

    def test_create_video_without_data(self):
        data = {}
        response = self.client.post(reverse('video_uploader_service-create-video'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_video')
    def test_delete_video(self, delete_video_mock):
        response = {'status_code': 204}
        delete_video_mock.return_value = response
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-delete-video', args=(video_id,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_video_mock.assert_called_once()
        delete_video_mock.assert_called_once_with(video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_video')
    def test_delete_video_with_no_delete_scope(self, delete_video_mock):
        response = {'data': {'error': 'Your access token does not have the "create" scope'}, 'status_code': 403}
        delete_video_mock.return_value = response
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-delete-video', args=(video_id,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_video_mock.assert_called_once()
        delete_video_mock.assert_called_once_with(video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_video')
    def test_delete_video_wit_invalid_id(self, delete_video_mock):
        response = {'status_code': 404}
        delete_video_mock.return_value = response
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-delete-video', args=(video_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_video_mock.assert_called_once()
        delete_video_mock.assert_called_once_with(video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_video')
    def test_specific_video(self, specific_video_mock):
        response = {"data": {
            "uri": "/videos/987654321",
            "name": "Untitled",
            "description": None,
            "type": "video",
            "link": "https://vimeo.com/987654321",
            "player_embed_url": "https://player.vimeo.com/video/987654321?h=ed6ba73968",
            "duration": 0,
            "width": 400,
            "language": None,
            "height": 300,
            "embed": {
                "html": "<iframe src=\"https://player.vimeo.com/video/987654321?h=ed6ba73968&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=262102\" width=\"400\" height=\"300\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Untitled\"></iframe>",
                "badges": {
                    "hdr": "false",
                    "live": {
                        "streaming": "false",
                        "archived": "false"
                    },
                    "staff_pick": {
                        "normal": "false",
                        "best_of_the_month": "false",
                        "best_of_the_year": "false",
                        "premiere": "false"
                    },
                    "vod": "false",
                    "weekend_challenge": "false"
                },
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": "false",
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "logos": {
                    "vimeo": True,
                    "custom": {
                        "active": "false",
                        "url": None,
                        "link": None,
                        "use_link": "false",
                        "sticky": "false"
                    }
                },
                "title": {
                    "name": "user",
                    "owner": "user",
                    "portrait": "user"
                },
                "end_screen": [],
                "playbar": True,
                "pip": True,
                "autopip": True,
                "volume": True,
                "color": "00adef",
                "event_schedule": True,
                "interactive": "false",
                "uri": None,
                "speed": True
            },
            "created_time": "2023-01-27T18:50:40+00:00",
            "modified_time": "2023-01-27T18:50:40+00:00",
            "release_time": "2023-01-27T18:50:40+00:00",
            "content_rating": [
                "unrated"
            ],
            "content_rating_class": "unrated",
            "rating_mod_locked": "false",
            "license": None,
            "privacy": {
                "view": "anybody",
                "embed": "public",
                "download": "false",
                "add": True,
                "comments": "anybody"
            },
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "7a491d0e8cad256a8ac2fd6d207e647c1b034bad",
                "default_picture": True
            },
            "tags": [],
            "stats": {
                "plays": 0
            },
            "categories": [],
            "uploader": {
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                }
            },
            "metadata": {
                "connections": {
                    "comments": {
                        "uri": "/videos/987654321/comments",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "credits": {
                        "uri": "/videos/987654321/credits",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "likes": {
                        "uri": "/videos/987654321/likes",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "pictures": {
                        "uri": "/videos/987654321/pictures",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "texttracks": {
                        "uri": "/videos/987654321/texttracks",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "related": None,
                    "recommendations": {
                        "uri": "/videos/987654321/recommendations",
                        "options": [
                            "GET"
                        ]
                    },
                    "albums": {
                        "uri": "/videos/987654321/albums",
                        "options": [
                            "GET",
                            "PATCH"
                        ],
                        "total": 0
                    },
                    "available_albums": {
                        "uri": "/videos/987654321/available_albums",
                        "options": [
                            "GET"
                        ],
                        "total": 2
                    },
                    "available_channels": {
                        "uri": "/videos/987654321/available_channels",
                        "options": [
                            "GET"
                        ],
                        "total": 1
                    },
                    "versions": {
                        "uri": "/videos/987654321/versions",
                        "options": [
                            "GET"
                        ],
                        "total": 1,
                        "latest_incomplete_version": None
                    }
                },
                "interactions": {
                    "watchlater": {
                        "uri": "/users/56789943/watchlater/987654321",
                        "options": [
                            "GET",
                            "PUT",
                            "DELETE"
                        ],
                        "added": "false",
                        "added_time": None
                    },
                    "report": {
                        "uri": "/videos/987654321/report",
                        "options": [
                            "POST"
                        ],
                        "reason": [
                            "pornographic",
                            "harassment",
                            "ripoff",
                            "incorrect rating",
                            "spam",
                            "causes harm",
                            "csam"
                        ]
                    },
                    "view_team_members": {
                        "uri": "/videos/987654321/teammembers",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "blocked_fields": [
                            "custom_url"
                        ]
                    },
                    "edit_content_rating": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_rating": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "advertisement",
                            "safe",
                            "unrated"
                        ]
                    },
                    "edit_privacy": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_type": "application/vnd.vimeo.video",
                        "properties": [
                            {
                                "name": "privacy.view",
                                "required": True,
                                "options": [
                                    "anybody",
                                    "nobody",
                                    "password",
                                    "disable",
                                    "unlisted"
                                ]
                            }
                        ]
                    },
                    "delete": {
                        "uri": "/videos/987654321",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "can_update_privacy_to_public": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "trim": {
                        "uri": "/videos/987654321/cliptrim",
                        "options": [
                            "GET",
                            "POST"
                        ]
                    },
                    "validate": {
                        "uri": "/videos/987654321/validate",
                        "options": [
                            "PUT"
                        ]
                    }
                },
                "is_vimeo_create": "false",
                "is_screen_record": "false"
            },
            "manage_link": "/manage/videos/987654321",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "parent_folder": None,
            "last_user_action_event_date": "2023-01-27T18:50:40+00:00",
            "review_page": {
                "active": True,
                "link": "https://vimeo.com/user56789943/review/987654321/dbebc4d84a",
                "is_shareable": True
            },
            "play": {
                "status": "unavailable"
            },
            "app": {
                "name": "saad test app",
                "uri": "/apps/262102"
            },
            "status": "uploading",
            "resource_key": "197ff1e79be5b831717ce6d9d7423ec12312c9ff",
            "upload": {
                "status": "in_progress",
                "upload_link": "https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/e1f714d6198eaedc3f6f8c1a16ced86a",
                "form": None,
                "complete_uri": None,
                "approach": "tus",
                "size": 1040,
                "redirect_url": None,
                "link": None
            },
            "transcode": {
                "status": "in_progress"
            },
            "is_playable": "false",
            "has_audio": "false"
        }, 'status_code': 200}
        specific_video_mock.return_value = response
        video_id = 987654321
        response = self.client.get(reverse('video_uploader_service-specific-video', args=(video_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specific_video_mock.assert_called_once()
        specific_video_mock.assert_called_once_with(video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_video')
    def test_specific_video_wit_invalid_id(self, specific_video_mock):
        response = {'status_code': 404}
        specific_video_mock.return_value = response
        video_id = 987654321
        response = self.client.get(reverse('video_uploader_service-specific-video', args=(video_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_video_mock.assert_called_once()
        specific_video_mock.assert_called_once_with(video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_video')
    def test_update_video(self, update_video_mock):
        response = {"data": {
            "uri": "/videos/987654321",
            "name": "Untitled",
            "description": None,
            "type": "video",
            "link": "https://vimeo.com/987654321",
            "player_embed_url": "https://player.vimeo.com/video/987654321?h=ed6ba73968",
            "duration": 0,
            "width": 400,
            "language": None,
            "height": 300,
            "embed": {
                "html": "<iframe src=\"https://player.vimeo.com/video/987654321?h=ed6ba73968&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=262102\" width=\"400\" height=\"300\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Untitled\"></iframe>",
                "badges": {
                    "hdr": "false",
                    "live": {
                        "streaming": "false",
                        "archived": "false"
                    },
                    "staff_pick": {
                        "normal": "false",
                        "best_of_the_month": "false",
                        "best_of_the_year": "false",
                        "premiere": "false"
                    },
                    "vod": "false",
                    "weekend_challenge": "false"
                },
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": "false",
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "logos": {
                    "vimeo": True,
                    "custom": {
                        "active": "false",
                        "url": None,
                        "link": None,
                        "use_link": "false",
                        "sticky": "false"
                    }
                },
                "title": {
                    "name": "user",
                    "owner": "user",
                    "portrait": "user"
                },
                "end_screen": [],
                "playbar": True,
                "pip": True,
                "autopip": True,
                "volume": True,
                "color": "00adef",
                "event_schedule": True,
                "interactive": "false",
                "uri": None,
                "speed": True
            },
            "created_time": "2023-01-27T18:50:40+00:00",
            "modified_time": "2023-01-27T18:50:40+00:00",
            "release_time": "2023-01-27T18:50:40+00:00",
            "content_rating": [
                "unrated"
            ],
            "content_rating_class": "unrated",
            "rating_mod_locked": "false",
            "license": None,
            "privacy": {
                "view": "anybody",
                "embed": "public",
                "download": "false",
                "add": True,
                "comments": "anybody"
            },
            "pictures": {
                "uri": None,
                "active": "false",
                "type": "default",
                "base_link": "https://i.vimeocdn.com/video/default",
                "sizes": [

                    {
                        "width": 1920,
                        "height": 1080,
                        "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                        "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                    }
                ],
                "resource_key": "7a491d0e8cad256a8ac2fd6d207e647c1b034bad",
                "default_picture": True
            },
            "tags": [],
            "stats": {
                "plays": 0
            },
            "categories": [],
            "uploader": {
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                }
            },
            "metadata": {
                "connections": {
                    "comments": {
                        "uri": "/videos/987654321/comments",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "credits": {
                        "uri": "/videos/987654321/credits",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "likes": {
                        "uri": "/videos/987654321/likes",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "pictures": {
                        "uri": "/videos/987654321/pictures",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "texttracks": {
                        "uri": "/videos/987654321/texttracks",
                        "options": [
                            "GET",
                            "POST"
                        ],
                        "total": 0
                    },
                    "related": None,
                    "recommendations": {
                        "uri": "/videos/987654321/recommendations",
                        "options": [
                            "GET"
                        ]
                    },
                    "albums": {
                        "uri": "/videos/987654321/albums",
                        "options": [
                            "GET",
                            "PATCH"
                        ],
                        "total": 0
                    },
                    "available_albums": {
                        "uri": "/videos/987654321/available_albums",
                        "options": [
                            "GET"
                        ],
                        "total": 2
                    },
                    "available_channels": {
                        "uri": "/videos/987654321/available_channels",
                        "options": [
                            "GET"
                        ],
                        "total": 1
                    },
                    "versions": {
                        "uri": "/videos/987654321/versions",
                        "options": [
                            "GET"
                        ],
                        "total": 1,
                        "latest_incomplete_version": None
                    }
                },
                "interactions": {
                    "watchlater": {
                        "uri": "/users/56789943/watchlater/987654321",
                        "options": [
                            "GET",
                            "PUT",
                            "DELETE"
                        ],
                        "added": "false",
                        "added_time": None
                    },
                    "report": {
                        "uri": "/videos/987654321/report",
                        "options": [
                            "POST"
                        ],
                        "reason": [
                            "pornographic",
                            "harassment",
                            "ripoff",
                            "incorrect rating",
                            "spam",
                            "causes harm",
                            "csam"
                        ]
                    },
                    "view_team_members": {
                        "uri": "/videos/987654321/teammembers",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "blocked_fields": [
                            "custom_url"
                        ]
                    },
                    "edit_content_rating": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_rating": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "advertisement",
                            "safe",
                            "unrated"
                        ]
                    },
                    "edit_privacy": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ],
                        "content_type": "application/vnd.vimeo.video",
                        "properties": [
                            {
                                "name": "privacy.view",
                                "required": True,
                                "options": [
                                    "anybody",
                                    "nobody",
                                    "password",
                                    "disable",
                                    "unlisted"
                                ]
                            }
                        ]
                    },
                    "delete": {
                        "uri": "/videos/987654321",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "can_update_privacy_to_public": {
                        "uri": "/videos/987654321",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "trim": {
                        "uri": "/videos/987654321/cliptrim",
                        "options": [
                            "GET",
                            "POST"
                        ]
                    },
                    "validate": {
                        "uri": "/videos/987654321/validate",
                        "options": [
                            "PUT"
                        ]
                    }
                },
                "is_vimeo_create": "false",
                "is_screen_record": "false"
            },
            "manage_link": "/manage/videos/987654321",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "parent_folder": None,
            "last_user_action_event_date": "2023-01-27T18:50:40+00:00",
            "review_page": {
                "active": True,
                "link": "https://vimeo.com/user56789943/review/987654321/dbebc4d84a",
                "is_shareable": True
            },
            "play": {
                "status": "unavailable"
            },
            "app": {
                "name": "saad test app",
                "uri": "/apps/262102"
            },
            "status": "uploading",
            "resource_key": "197ff1e79be5b831717ce6d9d7423ec12312c9ff",
            "upload": {
                "status": "in_progress",
                "upload_link": "https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/e1f714d6198eaedc3f6f8c1a16ced86a",
                "form": None,
                "complete_uri": None,
                "approach": "tus",
                "size": 1040,
                "redirect_url": None,
                "link": None
            },
            "transcode": {
                "status": "in_progress"
            },
            "is_playable": "false",
            "has_audio": "false"
        }, 'status_code': 200}
        update_video_mock.return_value = response
        video_id = 987654321
        data = {
            "description": "string",
            "embedded": {
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": True,
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "color": "string",
                "logos": {
                    "custom": {
                        "id": 0,
                        "active": True,
                        "link": "https://api.com",
                        "sticky": True
                    },
                    "vimeo": True
                },
                "playbar": True,
                "title": {
                    "name": "hide",
                    "owner": "hide",
                    "portrait": "hide"
                },
                "volume": True
            },
            "license": "by",
            "name": "string",
            "password": "string",
            "privacy": {
                "view": "anybody",
                "embed": "private",
                "add": True,
                "comments": "anybody"
            },
            "review_page": {
                "active": True
            }
        }
        response = self.client.patch(reverse('video_uploader_service-update-video', args=(video_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_video_mock.assert_called_once()
        update_video_mock.assert_called_once_with(video_id='987654321', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_video')
    def test_update_video_wit_invalid_id(self, update_video_mock):
        response = {'status_code': 404}
        update_video_mock.return_value = response
        video_id = 987654321
        data = {
            "description": "string",
            "embedded": {
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": True,
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "color": "string",
                "logos": {
                    "custom": {
                        "id": 0,
                        "active": True,
                        "link": "https://api.com",
                        "sticky": True
                    },
                    "vimeo": True
                },
                "playbar": True,
                "title": {
                    "name": "hide",
                    "owner": "hide",
                    "portrait": "hide"
                },
                "volume": True
            },
            "license": "by",
            "name": "string",
            "password": "string",
            "privacy": {
                "view": "anybody",
                "embed": "private",
                "add": True,
                "comments": "anybody"
            },
            "review_page": {
                "active": True
            }
        }
        response = self.client.patch(reverse('video_uploader_service-update-video', args=(video_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_video_mock.assert_called_once()
        update_video_mock.assert_called_once_with(video_id='987654321', payload=data, query_params={})

    def test_update_video_wit_invalid_data(self):
        video_id = 987654321
        data = {
            "description": 23,
            "embedded": {
                "buttons": {
                    "watchlater": 76,
                    "share": True,
                    "embed": True,
                    "hd": True,
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "color": "string",
                "logos": {
                    "custom": {
                        "id": 0,
                        "active": True,
                        "link": "https://api.com",
                        "sticky": True
                    },
                    "vimeo": True
                },
                "playbar": True,
                "title": {
                    "name": "hide",
                    "owner": "hide",
                    "portrait": "hide"
                },
                "volume": True
            },
            "license": "by",
            "name": "string",
            "password": "string",
            "privacy": {
                "view": "anybody",
                "embed": "private",
                "add": True,
                "comments": "anybody"
            },
            "review_page": {
                "active": True
            }
        }
        response = self.client.patch(reverse('video_uploader_service-update-video', args=(video_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_video')
    def test_update_video_with_no_edit_scope(self, update_video_mock):
        response = {'data': {'error': 'Your access token does not have the "edit" scope'}, 'status_code': 403}
        update_video_mock.return_value = response
        video_id = 987654321
        data = {
            "description": "string",
            "embedded": {
                "buttons": {
                    "watchlater": True,
                    "share": True,
                    "embed": True,
                    "hd": True,
                    "fullscreen": True,
                    "scaling": True,
                    "like": True
                },
                "color": "string",
                "logos": {
                    "custom": {
                        "id": 0,
                        "active": True,
                        "link": "https://api.com",
                        "sticky": True
                    },
                    "vimeo": True
                },
                "playbar": True,
                "title": {
                    "name": "hide",
                    "owner": "hide",
                    "portrait": "hide"
                },
                "volume": True
            },
            "license": "by",
            "name": "string",
            "password": "string",
            "privacy": {
                "view": "anybody",
                "embed": "private",
                "add": True,
                "comments": "anybody"
            },
            "review_page": {
                "active": True
            }
        }
        response = self.client.patch(reverse('video_uploader_service-update-video', args=(video_id,)), data=data,
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        update_video_mock.assert_called_once()
        update_video_mock.assert_called_once_with(video_id='987654321', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.user_video_list')
    def test_user_video_list(self, user_video_list_mock):
        response = {"data": {
            "total": 2,
            "page": 1,
            "per_page": 25,
            "paging": {
                "next": None,
                "previous": None,
                "first": "/users/56789943/videos?page=1",
                "last": "/users/56789943/videos?page=1"
            },
            "data": [
                {
                    "uri": "/videos/987654321",
                    "name": "string",
                    "description": "string",
                    "type": "video",
                    "link": "https://vimeo.com/987654321",
                    "player_embed_url": "https://player.vimeo.com/video/987654321?h=ff0f65aba9",
                    "duration": 0,
                    "width": 400,
                    "language": None,
                    "height": 300,
                    "embed": {
                        "html": "<iframe src=\"https://player.vimeo.com/video/987654321?h=ff0f65aba9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=262102\" width=\"400\" height=\"300\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"string\"></iframe>",
                        "badges": {
                            "hdr": "false",
                            "live": {
                                "streaming": "false",
                                "archived": "false"
                            },
                            "staff_pick": {
                                "normal": "false",
                                "best_of_the_month": "false",
                                "best_of_the_year": "false",
                                "premiere": "false"
                            },
                            "vod": "false",
                            "weekend_challenge": "false"
                        },
                        "buttons": {
                            "watchlater": True,
                            "share": True,
                            "embed": True,
                            "hd": "false",
                            "fullscreen": True,
                            "scaling": True,
                            "like": True
                        },
                        "logos": {
                            "vimeo": True,
                            "custom": {
                                "active": "false",
                                "url": None,
                                "link": None,
                                "use_link": "false",
                                "sticky": "false"
                            }
                        },
                        "title": {
                            "name": "user",
                            "owner": "user",
                            "portrait": "user"
                        },
                        "end_screen": [],
                        "playbar": True,
                        "pip": True,
                        "autopip": True,
                        "volume": True,
                        "color": "00adef",
                        "event_schedule": True,
                        "interactive": "false",
                        "uri": None,
                        "speed": True
                    },
                    "created_time": "2023-01-27T21:48:42+00:00",
                    "modified_time": "2023-01-27T21:48:42+00:00",
                    "release_time": "2023-01-27T21:48:42+00:00",
                    "content_rating": [
                        "unrated"
                    ],
                    "content_rating_class": "unrated",
                    "rating_mod_locked": "false",
                    "license": None,
                    "privacy": {
                        "view": "anybody",
                        "embed": "public",
                        "download": "false",
                        "add": True,
                        "comments": "anybody"
                    },
                    "pictures": {
                        "uri": None,
                        "active": "false",
                        "type": "default",
                        "base_link": "https://i.vimeocdn.com/video/default",
                        "sizes": [
                            {
                                "width": 1920,
                                "height": 1080,
                                "link": "https://i.vimeocdn.com/video/default_1920x1080?r=pad",
                                "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                            }
                        ],
                        "resource_key": "7a491d0e8cad256a8ac2fd6d207e647c1b034bad",
                        "default_picture": True
                    },
                    "tags": [],
                    "stats": {
                        "plays": 0
                    },
                    "categories": [],
                    "uploader": {
                        "pictures": {
                            "uri": "/users/56789943/pictures/12345678",
                            "active": True,
                            "type": "custom",
                            "base_link": "https://i.vimeocdn.com/portrait/12345678",
                            "sizes": [
                                {
                                    "width": 360,
                                    "height": 360,
                                    "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                                }
                            ],
                            "resource_key": "a72e52d68f861840c903170313586611527e4906",
                            "default_picture": "false"
                        }
                    },
                    "metadata": {
                        "connections": {
                            "comments": {
                                "uri": "/videos/987654321/comments",
                                "options": [
                                    "GET",
                                    "POST"
                                ],
                                "total": 0
                            },
                            "credits": {
                                "uri": "/videos/987654321/credits",
                                "options": [
                                    "GET",
                                    "POST"
                                ],
                                "total": 0
                            },
                            "likes": {
                                "uri": "/videos/987654321/likes",
                                "options": [
                                    "GET"
                                ],
                                "total": 0
                            },
                            "pictures": {
                                "uri": "/videos/987654321/pictures",
                                "options": [
                                    "GET",
                                    "POST"
                                ],
                                "total": 0
                            },
                            "texttracks": {
                                "uri": "/videos/987654321/texttracks",
                                "options": [
                                    "GET",
                                    "POST"
                                ],
                                "total": 0
                            },
                            "related": {
                                "uri": "/users/56789943/videos?offset=1",
                                "options": [
                                    "GET"
                                ]
                            },
                            "recommendations": {
                                "uri": "/videos/987654321/recommendations",
                                "options": [
                                    "GET"
                                ]
                            },
                            "albums": {
                                "uri": "/videos/987654321/albums",
                                "options": [
                                    "GET",
                                    "PATCH"
                                ],
                                "total": 0
                            },
                            "available_albums": {
                                "uri": "/videos/987654321/available_albums",
                                "options": [
                                    "GET"
                                ],
                                "total": 2
                            },
                            "available_channels": {
                                "uri": "/videos/987654321/available_channels",
                                "options": [
                                    "GET"
                                ],
                                "total": 1
                            },
                            "versions": {
                                "uri": "/videos/987654321/versions",
                                "options": [
                                    "GET"
                                ],
                                "total": 1,
                                "latest_incomplete_version": None
                            }
                        },
                        "interactions": {
                            "watchlater": {
                                "uri": "/users/56789943/watchlater/987654321",
                                "options": [
                                    "GET",
                                    "PUT",
                                    "DELETE"
                                ],
                                "added": "false",
                                "added_time": None
                            },
                            "report": {
                                "uri": "/videos/987654321/report",
                                "options": [
                                    "POST"
                                ],
                                "reason": [
                                    "pornographic",
                                    "harassment",
                                    "ripoff",
                                    "incorrect rating",
                                    "spam",
                                    "causes harm",
                                    "csam"
                                ]
                            },
                            "view_team_members": {
                                "uri": "/videos/987654321/teammembers",
                                "options": [
                                    "GET"
                                ]
                            },
                            "edit": {
                                "uri": "/videos/987654321",
                                "options": [
                                    "PATCH"
                                ],
                                "blocked_fields": [
                                    "custom_url"
                                ]
                            },
                            "edit_content_rating": {
                                "uri": "/videos/987654321",
                                "options": [
                                    "PATCH"
                                ],
                                "content_rating": [
                                    "language",
                                    "drugs",
                                    "violence",
                                    "nudity",
                                    "advertisement",
                                    "safe",
                                    "unrated"
                                ]
                            },
                            "edit_privacy": {
                                "uri": "/videos/987654321",
                                "options": [
                                    "PATCH"
                                ],
                                "content_type": "application/vnd.vimeo.video",
                                "properties": [
                                    {
                                        "name": "privacy.view",
                                        "required": True,
                                        "options": [
                                            "anybody",
                                            "nobody",
                                            "password",
                                            "disable",
                                            "unlisted"
                                        ]
                                    }
                                ]
                            },
                            "delete": {
                                "uri": "/videos/987654321",
                                "options": [
                                    "DELETE"
                                ]
                            },
                            "can_update_privacy_to_public": {
                                "uri": "/videos/987654321",
                                "options": [
                                    "PATCH"
                                ]
                            },
                            "trim": {
                                "uri": "/videos/987654321/cliptrim",
                                "options": [
                                    "GET",
                                    "POST"
                                ]
                            },
                            "validate": {
                                "uri": "/videos/987654321/validate",
                                "options": [
                                    "PUT"
                                ]
                            }
                        },
                        "is_vimeo_create": "false",
                        "is_screen_record": "false"
                    },
                    "manage_link": "/manage/videos/987654321",
                    "user": {
                        "uri": "/users/56789943",
                        "name": "test user",
                        "link": "https://vimeo.com/user56789943",
                        "capabilities": {
                            "hasLiveSubscription": "false",
                            "hasEnterpriseLihp": "false",
                            "hasSvvTimecodedComments": "false",
                            "hasSimplifiedEnterpriseAccount": "false"
                        },
                        "location": "",
                        "gender": "",
                        "bio": None,
                        "short_bio": None,
                        "created_time": "2023-01-24T06:34:04+00:00",
                        "pictures": {
                            "uri": "/users/56789943/pictures/12345678",
                            "active": True,
                            "type": "custom",
                            "base_link": "https://i.vimeocdn.com/portrait/12345678",
                            "sizes": [

                                {
                                    "width": 360,
                                    "height": 360,
                                    "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                                }
                            ],
                            "resource_key": "a72e52d68f861840c903170313586611527e4906",
                            "default_picture": "false"
                        },
                        "websites": [],
                        "metadata": {
                            "connections": {
                                "albums": {
                                    "uri": "/users/56789943/albums",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 2
                                },
                                "appearances": {
                                    "uri": "/users/56789943/appearances",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "categories": {
                                    "uri": "/users/56789943/categories",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "channels": {
                                    "uri": "/users/56789943/channels",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "feed": {
                                    "uri": "/users/56789943/feed",
                                    "options": [
                                        "GET"
                                    ]
                                },
                                "followers": {
                                    "uri": "/users/56789943/followers",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "following": {
                                    "uri": "/users/56789943/following",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "groups": {
                                    "uri": "/users/56789943/groups",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 3
                                },
                                "likes": {
                                    "uri": "/users/56789943/likes",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "membership": {
                                    "uri": "/users/56789943/membership/",
                                    "options": [
                                        "PATCH"
                                    ]
                                },
                                "moderated_channels": {
                                    "uri": "/users/56789943/channels?filter=moderated",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 1
                                },
                                "portfolios": {
                                    "uri": "/users/56789943/portfolios",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "videos": {
                                    "uri": "/users/56789943/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 2
                                },
                                "watchlater": {
                                    "uri": "/users/56789943/watchlater",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "shared": {
                                    "uri": "/users/56789943/shared/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "pictures": {
                                    "uri": "/users/56789943/pictures",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 1
                                },
                                "watched_videos": {
                                    "uri": "/me/watched/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "folders_root": {
                                    "uri": "/users/56789943/folders/root",
                                    "options": [
                                        "GET"
                                    ]
                                },
                                "folders": {
                                    "uri": "/users/56789943/folders",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 4
                                },
                                "teams": {
                                    "uri": "/users/56789943/teams",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 1
                                },
                                "block": {
                                    "uri": "/me/block",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                }
                            }
                        },
                        "location_details": {
                            "formatted_address": "",
                            "latitude": None,
                            "longitude": None,
                            "city": None,
                            "state": None,
                            "neighborhood": None,
                            "sub_locality": None,
                            "state_iso_code": None,
                            "country": None,
                            "country_iso_code": None
                        },
                        "skills": [],
                        "available_for_hire": "false",
                        "can_work_remotely": "false",
                        "preferences": {
                            "videos": {
                                "rating": [
                                    "unrated"
                                ],
                                "privacy": {
                                    "view": "anybody",
                                    "comments": "anybody",
                                    "embed": "public",
                                    "download": True,
                                    "add": True,
                                    "allow_share_link": True
                                }
                            },
                            "webinar_registrant_lower_watermark_banner_dismissed": []
                        },
                        "content_filter": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "safe",
                            "unrated"
                        ],
                        "upload_quota": {
                            "space": {
                                "free": 0,
                                "max": 2,
                                "used": 2,
                                "showing": "periodic",
                                "unit": "video_count"
                            },
                            "periodic": {
                                "period": "month",
                                "unit": "video_count",
                                "free": 0,
                                "max": 2,
                                "used": 2,
                                "reset_date": "2023-02-24T00:00:00-05:00"
                            },
                            "lifetime": {
                                "unit": "video_count",
                                "free": 23,
                                "max": 25,
                                "used": 2
                            }
                        },
                        "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                        "account": "free"
                    },
                    "parent_folder": None,
                    "last_user_action_event_date": "2023-01-27T21:48:42+00:00",
                    "review_page": {
                        "active": True,
                        "link": "https://vimeo.com/user56789943/review/987654321/ab06e70235",
                        "is_shareable": True
                    },
                    "play": {
                        "status": "unavailable"
                    },
                    "app": {
                        "name": "saad test app",
                        "uri": "/apps/262102"
                    },
                    "status": "uploading",
                    "resource_key": "8fe70caf0cab75d464e43b29edef55995aee9731",
                    "upload": {
                        "status": "in_progress",
                        "upload_link": None,
                        "form": None,
                        "complete_uri": None,
                        "approach": "post",
                        "size": 4040,
                        "redirect_url": None,
                        "link": None
                    },
                    "transcode": {
                        "status": "in_progress"
                    },
                    "is_playable": "false",
                    "has_audio": "false"
                },
            ]
        }, 'status_code': 200}
        user_video_list_mock.return_value = response
        user_id = 56789943
        response = self.client.get(reverse('video_uploader_service-user-video-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_video_list_mock.assert_called_once()
        user_video_list_mock.assert_called_once_with(user_id='56789943', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.user_video_list')
    def test_user_video_list_with_invalid_user_id(self, user_video_list_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        user_video_list_mock.return_value = response
        user_id = 56789943
        response = self.client.get(reverse('video_uploader_service-user-video-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        user_video_list_mock.assert_called_once()
        user_video_list_mock.assert_called_once_with(user_id='56789943', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.like_video')
    def test_like_video_with_invalid_user_id(self, like_video_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        like_video_mock.return_value = response
        user_id = 56789943
        video_id = 987654321
        response = self.client.put(reverse('video_uploader_service-like-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        like_video_mock.assert_called_once()
        like_video_mock.assert_called_once_with(user_id='56789943', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.like_video')
    def test_like_video(self, like_video_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 204}
        like_video_mock.return_value = response
        user_id = 56789943
        video_id = 987654321
        response = self.client.put(reverse('video_uploader_service-like-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        like_video_mock.assert_called_once()
        like_video_mock.assert_called_once_with(user_id='56789943', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.like_video')
    def test_like_video_with_no_like_scope(self, like_video_mock):
        response = {'data': {'error': 'Your access token does not have the "like" scope'}, 'status_code': 403}
        like_video_mock.return_value = response
        user_id = 56789943
        video_id = 987654321
        response = self.client.put(reverse('video_uploader_service-like-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        like_video_mock.assert_called_once()
        like_video_mock.assert_called_once_with(user_id='56789943', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.unlike_video')
    def test_unlike_video_with_invalid_user_id(self, unlike_video_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        unlike_video_mock.return_value = response
        user_id = 19312516
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-unlike-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        unlike_video_mock.assert_called_once()
        unlike_video_mock.assert_called_once_with(user_id='19312516', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.unlike_video')
    def test_unlike_video(self, unlike_video_mock):
        response = {"status_code": 204}
        unlike_video_mock.return_value = response
        user_id = 56789943
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-unlike-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        unlike_video_mock.assert_called_once()
        unlike_video_mock.assert_called_once_with(user_id='56789943', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.unlike_video')
    def test_unlike_video_with_no_unlike_scope(self, unlike_video_mock):
        response = {'data': {'error': 'Your access token does not have the "unlike" scope'}, 'status_code': 403}
        unlike_video_mock.return_value = response
        user_id = 56789943
        video_id = 987654321
        response = self.client.delete(reverse('video_uploader_service-unlike-video', args=(user_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        unlike_video_mock.assert_called_once()
        unlike_video_mock.assert_called_once_with(user_id='56789943', video_id='987654321', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_folder')
    def test_create_folder(self, create_folder_mock):
        response = {"data": {
            "created_time": "2023-01-27T23:01:24+00:00",
            "modified_time": "2023-01-27T23:01:24+00:00",
            "last_user_action_event_date": "2023-01-27T23:01:24+00:00",
            "name": "new folder",
            "privacy": {
                "view": "nobody"
            },
            "resource_key": "715b8c49dd3a1a0a9301b9f37bf6b1e097af401b",
            "uri": "/users/56789943/projects/14724344",
            "link": None,
            "pinned_on": None,
            "is_pinned": "false",
            "is_private_to_user": "false",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [
                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 5
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "access_grant": None,
            "metadata": {
                "connections": {
                    "items": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/users/56789943/projects/14724344/videos",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "folders": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "ancestor_path": []
                },
                "interactions": {
                    "edit": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "move_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "upload_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "POST"
                        ]
                    },
                    "view": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit_settings": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "delete": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "delete_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "add_subfolder": {
                        "uri": "/user/56789943/projects",
                        "options": [
                            "POST"
                        ],
                        "can_add_subfolders": True,
                        "subfolder_depth_limit_reached": "false",
                        "content_type": "application/vnd.vimeo.folder",
                        "properties": [
                            {
                                "name": "name",
                                "required": "false",
                                "value": ""
                            },
                            {
                                "name": "parent_folder_uri",
                                "required": True,
                                "value": "/users/56789943/projects/14724344"
                            }
                        ]
                    }
                }
            }
        }, "status_code": 201}
        create_folder_mock.return_value = response
        user_id = 56789943
        data = {
            "name": "new folder"
        }
        response = self.client.post(reverse('video_uploader_service-create-folder', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_folder_mock.assert_called_once()
        create_folder_mock.assert_called_once_with(user_id='56789943', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_folder')
    def test_create_folder_with_invalid_user_id(self, create_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        create_folder_mock.return_value = response
        user_id = 56789943
        data = {
            "name": "new folder"
        }
        response = self.client.post(reverse('video_uploader_service-create-folder', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        create_folder_mock.assert_called_once()
        create_folder_mock.assert_called_once_with(user_id='56789943', payload=data, query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.create_folder')
    def test_create_folder_with_no_create_scope(self, create_folder_mock):
        response = {'data': {'error': 'Your access token does not have the "create" scope'}, 'status_code': 403}
        create_folder_mock.return_value = response
        user_id = 56789943
        data = {
            "name": "new folder"
        }
        response = self.client.post(reverse('video_uploader_service-create-folder', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        create_folder_mock.assert_called_once()
        create_folder_mock.assert_called_once_with(user_id='56789943', payload=data, query_params={})

    def test_create_folder_without_data(self):
        user_id = 56789943
        data = {}
        response = self.client.post(reverse('video_uploader_service-create-folder', args=(user_id,)), data=data,
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_folder')
    def test_delete_folder_with_invalid_id(self, delete_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        delete_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        response = self.client.delete(reverse('video_uploader_service-delete-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_folder_mock.assert_called_once()
        delete_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_folder')
    def test_delete_folder_with_invalid_user_id(self, delete_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        delete_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        response = self.client.delete(reverse('video_uploader_service-delete-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_folder_mock.assert_called_once()
        delete_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_folder')
    def test_delete_folder(self, delete_folder_mock):
        response = {"data": {"message": "Item deleted successfully."}, "status_code": 204}
        delete_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        response = self.client.delete(reverse('video_uploader_service-delete-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_folder_mock.assert_called_once()
        delete_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.delete_folder')
    def test_delete_folder_with_no_delete_scope(self, delete_folder_mock):
        response = {'data': {'error': 'Your access token does not have the "delete" scope'}, 'status_code': 403}
        delete_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        response = self.client.delete(reverse('video_uploader_service-delete-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_folder_mock.assert_called_once()
        delete_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_folder')
    def test_update_folder(self, update_folder_mock):
        response = {"data": {
            "created_time": "2023-01-27T23:01:24+00:00",
            "modified_time": "2023-01-27T23:01:24+00:00",
            "last_user_action_event_date": "2023-01-27T23:01:24+00:00",
            "name": "new folder",
            "privacy": {
                "view": "nobody"
            },
            "resource_key": "715b8c49dd3a1a0a9301b9f37bf6b1e097af401b",
            "uri": "/users/56789943/projects/14724344",
            "link": None,
            "pinned_on": None,
            "is_pinned": "false",
            "is_private_to_user": "false",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 5
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "access_grant": None,
            "metadata": {
                "connections": {
                    "items": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/users/56789943/projects/14724344/videos",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "folders": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "ancestor_path": []
                },
                "interactions": {
                    "edit": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "move_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "upload_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "POST"
                        ]
                    },
                    "view": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit_settings": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "delete": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "delete_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "add_subfolder": {
                        "uri": "/user/56789943/projects",
                        "options": [
                            "POST"
                        ],
                        "can_add_subfolders": True,
                        "subfolder_depth_limit_reached": "false",
                        "content_type": "application/vnd.vimeo.folder",
                        "properties": [
                            {
                                "name": "name",
                                "required": "false",
                                "value": ""
                            },
                            {
                                "name": "parent_folder_uri",
                                "required": True,
                                "value": "/users/56789943/projects/14724344"
                            }
                        ]
                    }
                }
            }
        }, "status_code": 200}
        update_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        data = {
            "name": "new collection 2023"
        }
        response = self.client.patch(reverse('video_uploader_service-update-folder', args=(user_id, folder_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_folder_mock.assert_called_once()
        update_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', payload=data,
                                                   query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_folder')
    def test_update_folder_with_invalid_id(self, update_folder_mock):
        response = {"data": {}, "status_code": 404}
        update_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        data = {
            "name": "new collection 2023"
        }
        response = self.client.patch(reverse('video_uploader_service-update-folder', args=(user_id, folder_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_folder_mock.assert_called_once()
        update_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', payload=data,
                                                   query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.update_folder')
    def test_update_folder_with_no_edit_scope(self, update_folder_mock):
        response = {'data': {'error': 'Your access token does not have the "edit" scope'}, 'status_code': 403}
        update_folder_mock.return_value = response
        user_id = 56789943
        folder_id = 14724344
        data = {
            "name": "new collection 2023"
        }
        response = self.client.patch(reverse('video_uploader_service-update-folder', args=(user_id, folder_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        update_folder_mock.assert_called_once()
        update_folder_mock.assert_called_once_with(user_id='56789943', project_id='14724344', payload=data,
                                                   query_params={})

    def test_update_folder_with_invalid_data(self):
        user_id = 56789943
        folder_id = 14724344
        data = {
            "name": "string",
            "parent_folder_uri": "string"
        }
        response = self.client.patch(reverse('video_uploader_service-update-folder', args=(user_id, folder_id)),
                                     data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.folder_list')
    def test_folder_list_with_invalid_user_id(self, folder_list_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        folder_list_mock.return_value = response
        user_id = 19312516
        response = self.client.get(reverse('video_uploader_service-folder-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        folder_list_mock.assert_called_once()
        folder_list_mock.assert_called_once_with(user_id='19312516', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.folder_list')
    def test_folder_list(self, folder_list_mock):
        response = {"data": {
            "total": 6,
            "page": 1,
            "per_page": 25,
            "paging": {
                "next": None,
                "previous": None,
                "first": "/users/56789943/projects?page=1",
                "last": "/users/56789943/projects?page=1"
            },
            "data": [
                {
                    "created_time": "2023-01-27T19:58:48+00:00",
                    "modified_time": "2023-01-27T20:57:14+00:00",
                    "last_user_action_event_date": "2023-01-27T20:57:14+00:00",
                    "name": "Google",
                    "privacy": {
                        "view": "nobody"
                    },
                    "resource_key": "c0b1c5a19037f84e7258b367d763b20740584d26",
                    "uri": "/users/56789943/projects/14722366",
                    "link": None,
                    "pinned_on": None,
                    "is_pinned": "false",
                    "is_private_to_user": "false",
                    "user": {
                        "uri": "/users/56789943",
                        "name": "test user",
                        "link": "https://vimeo.com/user56789943",
                        "capabilities": {
                            "hasLiveSubscription": "false",
                            "hasEnterpriseLihp": "false",
                            "hasSvvTimecodedComments": "false",
                            "hasSimplifiedEnterpriseAccount": "false"
                        },
                        "location": "",
                        "gender": "",
                        "bio": None,
                        "short_bio": None,
                        "created_time": "2023-01-24T06:34:04+00:00",
                        "pictures": {
                            "uri": "/users/56789943/pictures/12345678",
                            "active": True,
                            "type": "custom",
                            "base_link": "https://i.vimeocdn.com/portrait/12345678",
                            "sizes": [

                                {
                                    "width": 360,
                                    "height": 360,
                                    "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                                }
                            ],
                            "resource_key": "a72e52d68f861840c903170313586611527e4906",
                            "default_picture": "false"
                        },
                        "websites": [],
                        "metadata": {
                            "connections": {
                                "albums": {
                                    "uri": "/users/56789943/albums",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 2
                                },
                                "appearances": {
                                    "uri": "/users/56789943/appearances",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "categories": {
                                    "uri": "/users/56789943/categories",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "channels": {
                                    "uri": "/users/56789943/channels",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "feed": {
                                    "uri": "/users/56789943/feed",
                                    "options": [
                                        "GET"
                                    ]
                                },
                                "followers": {
                                    "uri": "/users/56789943/followers",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "following": {
                                    "uri": "/users/56789943/following",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "groups": {
                                    "uri": "/users/56789943/groups",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 3
                                },
                                "likes": {
                                    "uri": "/users/56789943/likes",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "membership": {
                                    "uri": "/users/56789943/membership/",
                                    "options": [
                                        "PATCH"
                                    ]
                                },
                                "moderated_channels": {
                                    "uri": "/users/56789943/channels?filter=moderated",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 1
                                },
                                "portfolios": {
                                    "uri": "/users/56789943/portfolios",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "videos": {
                                    "uri": "/users/56789943/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 2
                                },
                                "watchlater": {
                                    "uri": "/users/56789943/watchlater",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "shared": {
                                    "uri": "/users/56789943/shared/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "pictures": {
                                    "uri": "/users/56789943/pictures",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 1
                                },
                                "watched_videos": {
                                    "uri": "/me/watched/videos",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                },
                                "folders_root": {
                                    "uri": "/users/56789943/folders/root",
                                    "options": [
                                        "GET"
                                    ]
                                },
                                "folders": {
                                    "uri": "/users/56789943/folders",
                                    "options": [
                                        "GET",
                                        "POST"
                                    ],
                                    "total": 6
                                },
                                "teams": {
                                    "uri": "/users/56789943/teams",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 1
                                },
                                "block": {
                                    "uri": "/me/block",
                                    "options": [
                                        "GET"
                                    ],
                                    "total": 0
                                }
                            }
                        },
                        "location_details": {
                            "formatted_address": "",
                            "latitude": None,
                            "longitude": None,
                            "city": None,
                            "state": None,
                            "neighborhood": None,
                            "sub_locality": None,
                            "state_iso_code": None,
                            "country": None,
                            "country_iso_code": None
                        },
                        "skills": [],
                        "available_for_hire": "false",
                        "can_work_remotely": "false",
                        "preferences": {
                            "videos": {
                                "rating": [
                                    "unrated"
                                ],
                                "privacy": {
                                    "view": "anybody",
                                    "comments": "anybody",
                                    "embed": "public",
                                    "download": True,
                                    "add": True,
                                    "allow_share_link": True
                                }
                            },
                            "webinar_registrant_lower_watermark_banner_dismissed": []
                        },
                        "content_filter": [
                            "language",
                            "drugs",
                            "violence",
                            "nudity",
                            "safe",
                            "unrated"
                        ],
                        "upload_quota": {
                            "space": {
                                "free": 0,
                                "max": 2,
                                "used": 2,
                                "showing": "periodic",
                                "unit": "video_count"
                            },
                            "periodic": {
                                "period": "month",
                                "unit": "video_count",
                                "free": 0,
                                "max": 2,
                                "used": 2,
                                "reset_date": "2023-02-24T00:00:00-05:00"
                            },
                            "lifetime": {
                                "unit": "video_count",
                                "free": 23,
                                "max": 25,
                                "used": 2
                            }
                        },
                        "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                        "account": "free"
                    },
                    "access_grant": None,
                    "metadata": {
                        "connections": {
                            "items": {
                                "uri": "/users/56789943/projects/14722366/items",
                                "options": [
                                    "GET"
                                ],
                                "total": 1
                            },
                            "videos": {
                                "uri": "/users/56789943/projects/14722366/videos",
                                "options": [
                                    "GET",
                                    "DELETE",
                                    "PUT"
                                ],
                                "total": 1
                            },
                            "folders": {
                                "uri": "/users/56789943/projects/14722366/items",
                                "options": [
                                    "GET",
                                    "DELETE",
                                    "PUT"
                                ],
                                "total": 0
                            },
                            "ancestor_path": []
                        },
                        "interactions": {
                            "edit": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "PATCH"
                                ]
                            },
                            "move_video": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "PATCH"
                                ]
                            },
                            "upload_video": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "POST"
                                ]
                            },
                            "view": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "GET"
                                ]
                            },
                            "edit_settings": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "PATCH"
                                ]
                            },
                            "delete": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "DELETE"
                                ]
                            },
                            "delete_video": {
                                "uri": "/users/56789943/projects/14722366",
                                "options": [
                                    "DELETE"
                                ]
                            },
                            "add_subfolder": {
                                "uri": "/user/56789943/projects",
                                "options": [
                                    "POST"
                                ],
                                "can_add_subfolders": True,
                                "subfolder_depth_limit_reached": "false",
                                "content_type": "application/vnd.vimeo.folder",
                                "properties": [
                                    {
                                        "name": "name",
                                        "required": "false",
                                        "value": ""
                                    },
                                    {
                                        "name": "parent_folder_uri",
                                        "required": True,
                                        "value": "/users/56789943/projects/14722366"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }, "status_code": 200}
        folder_list_mock.return_value = response
        user_id = 56789943
        response = self.client.get(reverse('video_uploader_service-folder-list', args=(user_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        folder_list_mock.assert_called_once()
        folder_list_mock.assert_called_once_with(user_id='56789943', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_folder')
    def test_specific_folder_with_invalid_user_id(self, specific_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        specific_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        response = self.client.get(reverse('video_uploader_service-specific-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_folder_mock.assert_called_once()
        specific_folder_mock.assert_called_once_with(user_id='19312516', project_id='14722366',
                                                     query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_folder')
    def test_specific_folder_with_invalid_folder_id(self, specific_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        specific_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        response = self.client.get(reverse('video_uploader_service-specific-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        specific_folder_mock.assert_called_once()
        specific_folder_mock.assert_called_once_with(user_id='19312516', project_id='14722366',
                                                     query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.specific_folder')
    def test_specific_folder(self, specific_folder_mock):
        response = {"data": {
            "created_time": "2023-01-27T23:01:24+00:00",
            "modified_time": "2023-01-27T23:01:24+00:00",
            "last_user_action_event_date": "2023-01-27T23:01:24+00:00",
            "name": "new folder",
            "privacy": {
                "view": "nobody"
            },
            "resource_key": "715b8c49dd3a1a0a9301b9f37bf6b1e097af401b",
            "uri": "/users/56789943/projects/14724344",
            "link": None,
            "pinned_on": None,
            "is_pinned": "false",
            "is_private_to_user": "false",
            "user": {
                "uri": "/users/56789943",
                "name": "test user",
                "link": "https://vimeo.com/user56789943",
                "capabilities": {
                    "hasLiveSubscription": "false",
                    "hasEnterpriseLihp": "false",
                    "hasSvvTimecodedComments": "false",
                    "hasSimplifiedEnterpriseAccount": "false"
                },
                "location": "",
                "gender": "",
                "bio": None,
                "short_bio": None,
                "created_time": "2023-01-24T06:34:04+00:00",
                "pictures": {
                    "uri": "/users/56789943/pictures/12345678",
                    "active": True,
                    "type": "custom",
                    "base_link": "https://i.vimeocdn.com/portrait/12345678",
                    "sizes": [

                        {
                            "width": 360,
                            "height": 360,
                            "link": "https://i.vimeocdn.com/portrait/12345678_360x360"
                        }
                    ],
                    "resource_key": "a72e52d68f861840c903170313586611527e4906",
                    "default_picture": "false"
                },
                "websites": [],
                "metadata": {
                    "connections": {
                        "albums": {
                            "uri": "/users/56789943/albums",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "appearances": {
                            "uri": "/users/56789943/appearances",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "categories": {
                            "uri": "/users/56789943/categories",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "channels": {
                            "uri": "/users/56789943/channels",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "feed": {
                            "uri": "/users/56789943/feed",
                            "options": [
                                "GET"
                            ]
                        },
                        "followers": {
                            "uri": "/users/56789943/followers",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "following": {
                            "uri": "/users/56789943/following",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "groups": {
                            "uri": "/users/56789943/groups",
                            "options": [
                                "GET"
                            ],
                            "total": 3
                        },
                        "likes": {
                            "uri": "/users/56789943/likes",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "membership": {
                            "uri": "/users/56789943/membership/",
                            "options": [
                                "PATCH"
                            ]
                        },
                        "moderated_channels": {
                            "uri": "/users/56789943/channels?filter=moderated",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "portfolios": {
                            "uri": "/users/56789943/portfolios",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "videos": {
                            "uri": "/users/56789943/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 2
                        },
                        "watchlater": {
                            "uri": "/users/56789943/watchlater",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "shared": {
                            "uri": "/users/56789943/shared/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "pictures": {
                            "uri": "/users/56789943/pictures",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 1
                        },
                        "watched_videos": {
                            "uri": "/me/watched/videos",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        },
                        "folders_root": {
                            "uri": "/users/56789943/folders/root",
                            "options": [
                                "GET"
                            ]
                        },
                        "folders": {
                            "uri": "/users/56789943/folders",
                            "options": [
                                "GET",
                                "POST"
                            ],
                            "total": 5
                        },
                        "teams": {
                            "uri": "/users/56789943/teams",
                            "options": [
                                "GET"
                            ],
                            "total": 1
                        },
                        "block": {
                            "uri": "/me/block",
                            "options": [
                                "GET"
                            ],
                            "total": 0
                        }
                    }
                },
                "location_details": {
                    "formatted_address": "",
                    "latitude": None,
                    "longitude": None,
                    "city": None,
                    "state": None,
                    "neighborhood": None,
                    "sub_locality": None,
                    "state_iso_code": None,
                    "country": None,
                    "country_iso_code": None
                },
                "skills": [],
                "available_for_hire": "false",
                "can_work_remotely": "false",
                "preferences": {
                    "videos": {
                        "rating": [
                            "unrated"
                        ],
                        "privacy": {
                            "view": "anybody",
                            "comments": "anybody",
                            "embed": "public",
                            "download": True,
                            "add": True,
                            "allow_share_link": True
                        }
                    },
                    "webinar_registrant_lower_watermark_banner_dismissed": []
                },
                "content_filter": [
                    "language",
                    "drugs",
                    "violence",
                    "nudity",
                    "safe",
                    "unrated"
                ],
                "upload_quota": {
                    "space": {
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "showing": "periodic",
                        "unit": "video_count"
                    },
                    "periodic": {
                        "period": "month",
                        "unit": "video_count",
                        "free": 0,
                        "max": 2,
                        "used": 2,
                        "reset_date": "2023-02-24T00:00:00-05:00"
                    },
                    "lifetime": {
                        "unit": "video_count",
                        "free": 23,
                        "max": 25,
                        "used": 2
                    }
                },
                "resource_key": "6697b3c5bb3cead1f3ee2aa384837272ad613e34",
                "account": "free"
            },
            "access_grant": None,
            "metadata": {
                "connections": {
                    "items": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET"
                        ],
                        "total": 0
                    },
                    "videos": {
                        "uri": "/users/56789943/projects/14724344/videos",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "folders": {
                        "uri": "/users/56789943/projects/14724344/items",
                        "options": [
                            "GET",
                            "DELETE",
                            "PUT"
                        ],
                        "total": 0
                    },
                    "ancestor_path": []
                },
                "interactions": {
                    "edit": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "move_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "upload_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "POST"
                        ]
                    },
                    "view": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "GET"
                        ]
                    },
                    "edit_settings": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "PATCH"
                        ]
                    },
                    "delete": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "delete_video": {
                        "uri": "/users/56789943/projects/14724344",
                        "options": [
                            "DELETE"
                        ]
                    },
                    "add_subfolder": {
                        "uri": "/user/56789943/projects",
                        "options": [
                            "POST"
                        ],
                        "can_add_subfolders": True,
                        "subfolder_depth_limit_reached": "false",
                        "content_type": "application/vnd.vimeo.folder",
                        "properties": [
                            {
                                "name": "name",
                                "required": "false",
                                "value": ""
                            },
                            {
                                "name": "parent_folder_uri",
                                "required": True,
                                "value": "/users/56789943/projects/14724344"
                            }
                        ]
                    }
                }
            }
        }, "status_code": 200}
        specific_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        response = self.client.get(reverse('video_uploader_service-specific-folder', args=(user_id, folder_id)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specific_folder_mock.assert_called_once()
        specific_folder_mock.assert_called_once_with(user_id='19312516', project_id='14722366', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_folder')
    def test_add_video_to_folder_with_invalid_user_id(self, add_video_to_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        add_video_to_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-folder', args=(user_id, folder_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_folder_mock.assert_called_once()
        add_video_to_folder_mock.assert_called_once_with(video_id='987654321', user_id='19312516', project_id='14722366'
                                                         , query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_folder')
    def test_add_video_to_folder_with_invalid_folder_id(self, add_video_to_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        add_video_to_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-folder', args=(user_id, folder_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_folder_mock.assert_called_once()
        add_video_to_folder_mock.assert_called_once_with(video_id='987654321', user_id='19312516',
                                                         project_id='14722366', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_folder')
    def test_add_video_to_folder_with_invalid_video_id(self, add_video_to_folder_mock):
        response = {"data": {"message": "Resource not found"}, "status_code": 404}
        add_video_to_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-folder', args=(user_id, folder_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_video_to_folder_mock.assert_called_once()
        add_video_to_folder_mock.assert_called_once_with(video_id='987654321', user_id='19312516',
                                                         project_id='14722366', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_folder')
    def test_add_video_to_folder(self, add_video_to_folder_mock):
        response = {"data": {"message": "The video was added"}, "status_code": 204}
        add_video_to_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-folder', args=(user_id, folder_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        add_video_to_folder_mock.assert_called_once()
        add_video_to_folder_mock.assert_called_once_with(video_id='987654321', user_id='19312516',
                                                         project_id='14722366', query_params={})

    @mock.patch(
        'modules.django_video_uploader.videouploader.services.videouploader.VideoUploaderService.add_video_to_folder')
    def test_add_video_to_folder_with_no_add_scope(self, add_video_to_folder_mock):
        response = {'data': {'error': 'Your access token does not have the "add" scope'}, 'status_code': 403}
        add_video_to_folder_mock.return_value = response
        user_id = 19312516
        folder_id = 14722366
        video_id = 987654321
        response = self.client.put(
            reverse('video_uploader_service-add-video-to-folder', args=(user_id, folder_id, video_id)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        add_video_to_folder_mock.assert_called_once()
        add_video_to_folder_mock.assert_called_once_with(video_id='987654321', user_id='19312516',
                                                         project_id='14722366', query_params={})
