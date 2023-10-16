from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import os
from unittest import mock


class WordPressAuthTokenTestCase(APITestCase):
    def setUp(self):
        self.code = 'bCB9Oqyqap'

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressBase.get_auth_token')
    def test_get_auth_token(self, get_auth_token_mock):
        responses = {'access_token': 'xyvAxL6RL@RbE2VXahCT0VX33kLZDsiT3JX@5bTSZ@Zj@#0PTVZnLoU9qpl$64Ru',
                     'token_type': 'bearer', 'blog_id': '213857288', 'blog_url': 'http://dummy15.wordpress.com',
                     'scope': ''}
        get_auth_token_mock.return_value = responses
        self.client.credentials(HTTP_WORDPRESS_CODE=self.code)
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url, format='json')
        self.assertEqual(responses['access_token'], response.data['access_token'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_auth_token_mock.assert_called_once()

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressBase.get_auth_token')
    def test_get_auth_token_with_expire_code(self, get_auth_token_mock):
        response = None
        get_auth_token_mock.return_value = response
        self.client.credentials(HTTP_WORDPRESS_CODE=self.code)
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        get_auth_token_mock.assert_called_once()

    def test_get_auth_token_without_code(self):
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressPostsTestCase(APITestCase):
    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.create_post')
    def test_create_post(self, create_post_mock):
        responses = {'data': {'ID': 20, 'site_ID': '213857288',
                              'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                         'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                         'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                         'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                         'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                         'site_ID': 213857288}, 'date': '2023-01-11T20:21:16+05:00',
                              'modified': '2023-01-11T20:21:16+05:00', 'title': 'my new personal',
                              'URL': 'https://dummy15.wordpress.com/2023/01/11/my-new-personal/',
                              'short_URL': 'https://wp.me/petk36-k', 'content': '', 'excerpt': '',
                              'slug': 'my-new-personal',
                              'guid': 'https://dummy15.wordpress.com/2023/01/11/my-new-personal/', 'status': 'publish',
                              'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                              'discussion': {'comments_open': True, 'comment_status': 'open', 'pings_open': True,
                                             'ping_status': 'open', 'comment_count': 0}, 'likes_enabled': True,
                              'sharing_enabled': True, 'like_count': 0, 'i_like': False, 'is_reblogged': False,
                              'is_following': True, 'global_ID': '163d2dcc86487215ab6d7e084d24c56c',
                              'featured_image': '', 'post_thumbnail': None, 'format': 'standard', 'geo': False,
                              'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {'category': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 8, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {},
                'post_format': {},
                'mentions': {}},
                              'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 8, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {},
                              'attachment_count': 0,
                              'metadata': [{'id': '121', 'key': 'jabber_published', 'value': '1673450477'}], 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/20',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/20/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/20/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/20/likes/'}},
                              'capabilities': {'publish_post': True, 'delete_post': True, 'edit_post': True},
                              'other_URLs': {'permalink_URL': 'https://dummy15.wordpress.com/2023/01/11/%postname%/',
                                             'suggested_slug': 'my-new-personal'}}, 'status_code': 200, 'success': True}
        create_post_mock.return_value = responses
        url = reverse('wordpress_posts-create-post')
        data = {
            "title": "my new person",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_post_mock.assert_called_once()

    def test_create_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-create-post')
        data = {
            "title": "my new person",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_multiple_posts')
    def test_get_multiple_posts(self, get_multiple_posts_mock):
        responses = {'data': {'found': 10, 'posts': [{'ID': 14, 'site_ID': '213857288',
                                                      'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e',
                                                                 'email': False, 'name': 'Shoaib Amjad',
                                                                 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                                                 'nice_name': 'muhammadshoaibeacfc7849e',
                                                                 'URL': 'http://dummy15.wordpress.com',
                                                                 'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                                                 'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                                                 'site_ID': 213857288},
                                                      'date': '2023-01-11T14:14:24+05:00',
                                                      'modified': '2023-01-11T14:14:24+05:00', 'title': 'extra post',
                                                      'URL': 'https://dummy15.wordpress.com/2023/01/11/extra-post-3/',
                                                      'short_URL': 'https://wp.me/petk36-e', 'content': '',
                                                      'excerpt': '', 'slug': 'extra-post-3',
                                                      'guid': 'https://dummy15.wordpress.com/2023/01/11/extra-post-3/',
                                                      'status': 'publish', 'sticky': False, 'password': '',
                                                      'parent': False, 'type': 'post',
                                                      'discussion': {'comments_open': True, 'comment_status': 'open',
                                                                     'pings_open': True, 'ping_status': 'open',
                                                                     'comment_count': 0}, 'likes_enabled': True,
                                                      'sharing_enabled': True, 'like_count': 0, 'i_like': False,
                                                      'is_reblogged': False, 'is_following': True,
                                                      'global_ID': '5f60889dcc88f1fba90cafa98a89ccbc',
                                                      'featured_image': '', 'post_thumbnail': None,
                                                      'format': 'standard', 'geo': False, 'menu_order': 0,
                                                      'page_template': '', 'publicize_URLs': [], 'terms': {'category': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized',
                                  'slug': 'uncategorized', 'description': '',
                                  'post_count': 8, 'parent': 0, 'meta': {
                        'links': {
                            'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                            'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                            'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}},
                'post_tag': {},
                'post_format': {},
                'mentions': {}},
                                                      'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized',
                                  'slug': 'uncategorized', 'description': '',
                                  'post_count': 8, 'parent': 0, 'meta': {
                        'links': {
                            'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                            'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                            'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}},
                                                      'attachments': {}, 'attachment_count': 0, 'metadata': [
                {'id': '80', 'key': 'jabber_published',
                 'value': '1673428466'}], 'meta': {'links': {
                'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/help',
                'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/replies/',
                'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/likes/'}},
                                                      'capabilities': {'publish_post': True, 'delete_post': True,
                                                                       'edit_post': True}, 'other_URLs': {}}], 'meta': {
            'links': {'counts': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/post-counts/post'},
            'wpcom': True}}, 'status_code': 200, 'success': True}
        get_multiple_posts_mock.return_value = responses
        url = reverse('wordpress_posts-get-multiple-post')
        response = self.client.get(url)
        self.assertEqual(responses['data']['found'], response.data['data']['found'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_multiple_posts_mock.assert_called_once()

    def test_get_multiple_posts_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-get-multiple-post')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.edit_post')
    def test_edit_post(self, edit_post_mock):
        responses = {'data': {'ID': 16, 'site_ID': '213857288',
                              'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                         'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                         'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                         'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                         'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                         'site_ID': 213857288}, 'date': '2023-01-11T14:15:41+05:00',
                              'modified': '2023-01-12T11:18:36+05:00', 'title': 'editing in post',
                              'URL': 'https://dummy15.wordpress.com/2023/01/11/extra-post-5/',
                              'short_URL': 'https://wp.me/petk36-g', 'content': '', 'excerpt': '',
                              'slug': 'extra-post-5', 'guid': 'https://dummy15.wordpress.com/2023/01/11/extra-post-5/',
                              'status': 'publish', 'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                              'discussion': {'comments_open': True, 'comment_status': 'open', 'pings_open': True,
                                             'ping_status': 'open', 'comment_count': 0}, 'likes_enabled': True,
                              'sharing_enabled': True, 'like_count': 0, 'i_like': False, 'is_reblogged': False,
                              'is_following': True, 'global_ID': '8df6856f9047f31c83ce23d400b76254',
                              'featured_image': '', 'post_thumbnail': None, 'format': 'standard', 'geo': False,
                              'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {'category': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 7, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {},
                'post_format': {},
                'mentions': {}},
                              'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 7, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {},
                              'attachment_count': 0,
                              'metadata': [{'id': '100', 'key': 'jabber_published', 'value': '1673428542'}], 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/16',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/16/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/16/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/16/likes/'}},
                              'capabilities': {'publish_post': True, 'delete_post': True, 'edit_post': True},
                              'other_URLs': {}}, 'status_code': 200, 'success': True}
        edit_post_mock.return_value = responses
        url = reverse(f'wordpress_posts-edit-post', kwargs={'pk': 16})
        data = {
            "title": "editing in post",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        edit_post_mock.assert_called_once()

    def test_edit_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse(f'wordpress_posts-edit-post', kwargs={'pk': 11})
        data = {
            "title": "extra post",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_single_post')
    def test_delete_single_post(self, delete_single_mock):
        responses = {'data': {'ID': 11, 'site_ID': '213857288',
                              'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                         'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                         'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                         'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                         'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                         'site_ID': 213857288}, 'date': '2023-01-11T14:11:00+05:00',
                              'modified': '2023-01-11T20:53:06+05:00', 'title': 'editings in post',
                              'URL': 'https://dummy15.wordpress.com/?p=11', 'short_URL': 'https://wp.me/petk36-b',
                              'content': '', 'excerpt': '', 'slug': 'my-personal-post__trashed',
                              'guid': 'https://dummy15.wordpress.com/2023/01/11/my-personal-post/', 'status': 'trash',
                              'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                              'discussion': {'comments_open': True, 'comment_status': 'open', 'pings_open': True,
                                             'ping_status': 'open', 'comment_count': 0}, 'likes_enabled': True,
                              'sharing_enabled': True, 'like_count': 0, 'i_like': False, 'is_reblogged': False,
                              'is_following': True, 'global_ID': 'ac097acedaaafa4be16b0ebc636df2ee',
                              'featured_image': '', 'post_thumbnail': None, 'format': 'standard', 'geo': False,
                              'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {'category': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 7, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {},
                'post_format': {},
                'mentions': {}},
                              'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 7, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {},
                              'attachment_count': 0,
                              'metadata': [{'id': '50', 'key': 'jabber_published', 'value': '1673428261'}], 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/likes/'}},
                              'capabilities': {'publish_post': True, 'delete_post': True, 'edit_post': True},
                              'other_URLs': {'permalink_URL': 'https://dummy15.wordpress.com/?p=11',
                                             'suggested_slug': 'my-personal-post__trashed'}}, 'status_code': 200,
                     'success': True}
        delete_single_mock.return_value = responses
        url = reverse('wordpress_posts-delete-single-post', kwargs={"pk": 11})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_single_mock.assert_called_once()

    def test_delete_single_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-delete-single-post', kwargs={"pk": 11})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_multiple_post')
    def test_delete_multiple_post(self, delete_multiple_post_mock):
        responses = {'data': {'results': {'14': {'ID': 14, 'site_ID': '213857288',
                                                 'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e',
                                                            'email': False, 'name': 'Shoaib Amjad',
                                                            'first_name': 'Shoaib', 'last_name': 'Amjad',
                                                            'nice_name': 'muhammadshoaibeacfc7849e',
                                                            'URL': 'http://dummy15.wordpress.com',
                                                            'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                                            'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                                            'site_ID': 213857288}, 'date': '2023-01-11T14:14:24+05:00',
                                                 'modified': '2023-01-12T12:27:38+05:00', 'title': 'extra post',
                                                 'URL': 'https://dummy15.wordpress.com/?p=14',
                                                 'short_URL': 'https://wp.me/petk36-e', 'content': '', 'excerpt': '',
                                                 'slug': 'extra-post-3__trashed',
                                                 'guid': 'https://dummy15.wordpress.com/2023/01/11/extra-post-3/',
                                                 'status': 'trash', 'sticky': False, 'password': '', 'parent': False,
                                                 'type': 'post',
                                                 'discussion': {'comments_open': True, 'comment_status': 'open',
                                                                'pings_open': True, 'ping_status': 'open',
                                                                'comment_count': 0}, 'likes_enabled': True,
                                                 'sharing_enabled': True, 'like_count': 0, 'i_like': False,
                                                 'is_reblogged': False, 'is_following': True,
                                                 'global_ID': '5f60889dcc88f1fba90cafa98a89ccbc', 'featured_image': '',
                                                 'post_thumbnail': None, 'format': 'standard', 'geo': False,
                                                 'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {
                'category': {
                    'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                      'post_count': 6, 'parent': 0, 'meta': {'links': {
                            'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                            'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                            'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {},
                'post_format': {}, 'mentions': {}}, 'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 6, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {},
                                                 'attachment_count': 0, 'metadata': [
                {'id': '80', 'key': 'jabber_published', 'value': '1673428466'}], 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/likes/'}},
                                                 'capabilities': {'publish_post': True, 'delete_post': True,
                                                                  'edit_post': True},
                                                 'other_URLs': {'permalink_URL': 'https://dummy15.wordpress.com/?p=14',
                                                                'suggested_slug': 'extra-post-3__trashed'}}}},
                     'status_code': 200, 'success': True}
        delete_multiple_post_mock.return_value = responses
        url = reverse('wordpress_posts-delete-multiple-post')
        data = {"post_ids": [14]}
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['results']['14'], response.data['data']['results']['14'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_multiple_post_mock.assert_called_once()

    def test_delete_multiple_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-delete-multiple-post')
        data = {"post_ids": [14]}
        responses = self.client.post(url, data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.restore_post')
    def test_restore_post(self, restore_post_mock):
        responses = {'data': {'ID': 14, 'site_ID': '213857288',
                              'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                         'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                         'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                         'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                         'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                         'site_ID': 213857288}, 'date': '2023-01-11T14:14:24+05:00',
                              'modified': '2023-01-12T12:36:16+05:00', 'title': 'extra post',
                              'URL': 'https://dummy15.wordpress.com/?p=14', 'short_URL': 'https://wp.me/petk36-e',
                              'content': '', 'excerpt': '', 'slug': 'extra-post-3',
                              'guid': 'https://dummy15.wordpress.com/2023/01/11/extra-post-3/', 'status': 'draft',
                              'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                              'discussion': {'comments_open': True, 'comment_status': 'open', 'pings_open': True,
                                             'ping_status': 'open', 'comment_count': 0}, 'likes_enabled': True,
                              'sharing_enabled': True, 'like_count': 0, 'i_like': False, 'is_reblogged': False,
                              'is_following': True, 'global_ID': '5f60889dcc88f1fba90cafa98a89ccbc',
                              'featured_image': '', 'post_thumbnail': None, 'format': 'standard', 'geo': False,
                              'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {'category': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 6, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {},
                'post_format': {},
                'mentions': {}},
                              'tags': {}, 'categories': {
                'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '',
                                  'post_count': 6, 'parent': 0, 'meta': {'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {},
                              'attachment_count': 0,
                              'metadata': [{'id': '80', 'key': 'jabber_published', 'value': '1673428466'}], 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/likes/'}},
                              'capabilities': {'publish_post': True, 'delete_post': True, 'edit_post': True},
                              'other_URLs': {'permalink_URL': 'https://dummy15.wordpress.com/2023/01/11/%postname%/',
                                             'suggested_slug': 'extra-post-3'}}, 'status_code': 200, 'success': True}
        restore_post_mock.return_value = responses
        url = reverse('wordpress_posts-restore-post', kwargs={"pk": 14})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        restore_post_mock.assert_called_once()

    def test_restore_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-restore-post', kwargs={"pk": 14})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.like_post')
    def test_like_post(self, like_post_mock):
        responses = {'data': {'success': False, 'i_like': False, 'like_count': 0, 'site_ID': 213857288, 'post_ID': 14,
                              'meta': {'links': {
                                  'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/likes/new/help',
                                  'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                                  'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}},
                              'liker': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                        'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                        'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                        'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                        'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                        'ip_address': False, 'site_ID': 213857288, 'site_visible': True,
                                        'default_avatar': True}}, 'status_code': 200, 'success': True}
        like_post_mock.return_value = responses
        url = reverse('wordpress_posts-like-post', kwargs={"pk": 14})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['site_ID'], response.data['data']['site_ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        like_post_mock.assert_called_once()

    def test_like_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-like-post', kwargs={"pk": 14})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.unlike_post')
    def test_unlike_post(self, unlike_post_mock):
        responses = {'data': {'success': False, 'i_like': False, 'like_count': 0, 'site_ID': 213857288, 'post_ID': 14,
                              'meta': {'links': {
                                  'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/likes/mine/delete/help',
                                  'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                                  'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}},
                              'liker': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False,
                                        'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
                                        'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
                                        'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                        'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e',
                                        'ip_address': False, 'site_ID': 213857288, 'site_visible': True,
                                        'default_avatar': True}}, 'status_code': 200, 'success': True}
        unlike_post_mock.return_value = responses
        url = reverse('wordpress_posts-unlike-post', kwargs={"pk": 14})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['site_ID'], response.data['data']['site_ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        unlike_post_mock.assert_called_once()

    def test_unlike_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-unlike-post', kwargs={"pk": 14})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_post_subscribers')
    def test_get_list_of_post_subscribers(self, get_list_of_post_subscribers_mock):
        responses = {'data': {'subscriptions': [], 'found': 0, 'meta': {
            'links': {'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                      'posts': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14',
                      'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/14/subscribers/help'}}},
                     'status_code': 200, 'success': True}
        get_list_of_post_subscribers_mock.return_value = responses
        url = reverse('wordpress_posts-get-list-of-post-subscribers', kwargs={"pk": 14})
        response = self.client.get(url)
        self.assertEqual(responses['data']['subscriptions'], response.data['data']['subscriptions'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_post_subscribers_mock.assert_called_once()

    def test_get_list_of_post_subscribers_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-get-list-of-post-subscribers', kwargs={"pk": 14})
        responses = self.client.get(url)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_likes')
    def test_get_list_of_likes(self, get_list_of_likes_mock):
        responses = {
            'data': {'found': 0, 'i_like': False, 'can_like': True, 'site_ID': 213857288, 'post_ID': 14, 'likes': []},
            'status_code': 200, 'success': True}
        get_list_of_likes_mock.return_value = responses
        url = reverse('wordpress_posts-get-list-of-likes', kwargs={"pk": 14})
        response = self.client.get(url)
        self.assertEqual(responses['data']['found'], response.data['data']['found'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_likes_mock.assert_called_once()

    def test_get_list_of_likes_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_posts-get-list-of-likes', kwargs={"pk": 14})
        responses = self.client.get(url)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)


class WordpressUsersTestCase(APITestCase):
    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_multiple_users')
    def test_get_multiple_users(self, get_multiple_users_mock):
        responses = {'data': {'found': 1, 'users': [
            {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': 'muhammad.shoaib@crowdbotics.com',
             'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad',
             'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com',
             'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
             'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e', 'ip_address': '', 'site_ID': 213857288,
             'site_visible': True, 'roles': ['administrator'], 'is_super_admin': False}]}, 'status_code': 200,
                     'success': True}
        get_multiple_users_mock.return_value = responses
        url = reverse('wordpress_users-get-multiple-users')
        response = self.client.get(url)
        self.assertEqual(responses['data']['found'], response.data['data']['found'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_multiple_users_mock.assert_called_once()

    def test_get_multiple_users_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_users-get-multiple-users')
        responses = self.client.get(url)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_user_details_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_users-update-user-details', kwargs={"pk": 1323})
        data = {
            "first_name": "Muhammad",
            "last_name": "shoaib"
        }
        responses = self.client.post(url, data, format="json")
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_user_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_users-delete-user', kwargs={"pk": 12333})
        responses = self.client.post(url, format="json")
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)


class WordpressSitesTestCase(APITestCase):
    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_rendered_shortcode_for_site')
    def test_get_rendered_shortcode_for_site(self, get_rendered_shortcode_for_site_mock):
        responses = {
            'data': {'shortcode': '[[gallery ids="729,732,731,720"]]', 'result': '[gallery ids="729,732,731,720"]'},
            'status_code': 200, 'success': True}
        get_rendered_shortcode_for_site_mock.return_value = responses
        url = reverse('wordpress_sites-get-rendered-shortcode-for-site')
        params = {
            "shortcode": "[%5Bgallery%20ids%3D%22729%2C732%2C731%2C720%22%5D]"
        }
        response = self.client.get(url, **params, format='json')
        self.assertEqual(responses['data']['shortcode'], response.data['data']['shortcode'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_rendered_shortcode_for_site_mock.assert_called_once()

    def test_get_rendered_shortcode_for_site_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_sites-get-rendered-shortcode-for-site')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_active_inactive_widgets')
    def test_get_active_inactive_widgets(self, get_active_inactive_widgets_mock):
        responses = {'data': {'widgets': [
            {'id': 'text-3', 'id_base': 'text', 'settings': {'title': '', 'text': '', 'filter': False},
             'sidebar': 'sidebar-2', 'position': 0},
            {'id': 'text-2', 'id_base': 'text', 'settings': {'title': '', 'text': '', 'filter': False},
             'sidebar': 'sidebar-2', 'position': 1},
            {'id': 'text-1', 'id_base': 'text', 'settings': {'title': '', 'text': '', 'filter': False},
             'sidebar': 'sidebar-2', 'position': 2}]}, 'status_code': 200, 'success': True}
        get_active_inactive_widgets_mock.return_value = responses
        url = reverse('wordpress_sites-get-active-inactive-widgets')
        response = self.client.get(url, format='json')
        self.assertEqual(responses['data']['widgets'], response.data['data']['widgets'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_active_inactive_widgets_mock.assert_called_once()

    def test_get_active_inactive_widgets_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_sites-get-active-inactive-widgets')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.activate_widget')
    def test_activate_widget(self, activate_widget_mock):
        responses = {'data': {'id': 'text-4', 'id_base': 'text', 'settings': {'title': '', 'text': '', 'filter': False},
                              'sidebar': 'sidebar-2', 'position': 3}, 'status_code': 200, 'success': True}
        activate_widget_mock.return_value = responses
        url = reverse('wordpress_sites-activate-widget')
        data = {
            "id_base": "text",
            "side_bar": "sidebar-2",
            "postion": 0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['id'], response.data['data']['id'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        activate_widget_mock.assert_called_once()

    def test_activate_widget_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_sites-activate-widget')
        data = {
            "id_base": "text",
            "side_bar": "sidebar-2",
            "postion": 0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.deactivate_widget')
    def test_deactivate_widget(self, deactivate_widget_mock):
        responses = {'data': {'id': 'text-6', 'id_base': 'text', 'settings': {'title': '', 'text': '', 'filter': False},
                              'sidebar': 'wp_inactive_widgets', 'position': 0}, 'status_code': 200, 'success': True}
        deactivate_widget_mock.return_value = responses
        url = reverse('wordpress_sites-deactivate-widget', kwargs={"pk": "text-5"})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['id'], response.data['data']['id'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        deactivate_widget_mock.assert_called_once()

    def test_deactivate_widget_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_sites-deactivate-widget', kwargs={"pk": "text-5"})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressCommentsTestCase(APITestCase):
    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.create_comment_on_post')
    def test_create_comment_on_post(self, create_comment_on_post_mock):
        response = {'data': {'ID': 2, 'post': {'ID': 13, 'title': 'extra post', 'type': 'post',
                                               'link': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13'},
                             'author': {'ID': 230036407, 'login': '', 'email': 'muhammad.shoaib@crowdbotics.com',
                                        'name': 'Shoaib Amjad', 'first_name': '', 'last_name': '', 'nice_name': '',
                                        'URL': 'http://dummy15.wordpress.com',
                                        'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                        'profile_URL': 'https://en.gravatar.com/8e49bfafb5fbca11b982d26c4801a8a0',
                                        'ip_address': '39.53.74.22'}, 'date': '2023-01-12T15:51:43+05:00',
                             'URL': 'https://dummy15.wordpress.com/2023/01/11/extra-post-2/comment-page-1/#comment-2',
                             'short_URL': 'https://wp.me/petk36-d%23comment-2',
                             'content': '<p>i dont like this post</p>\n', 'raw_content': 'i dont like this post',
                             'status': 'approved', 'parent': False, 'type': 'comment', 'like_count': 0, 'i_like': False,
                             'meta': {'links': {
                                 'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2',
                                 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/help',
                                 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                                 'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13',
                                 'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/replies/',
                                 'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/likes/'}},
                             'can_moderate': True, 'i_replied': False}, 'status_code': 200, 'success': True}
        create_comment_on_post_mock.return_value = response
        url = reverse('wordpress_comments-create-comment-on-post', kwargs={"pk": 13})
        data = {"content": "i dont like this post"}
        Response = self.client.post(url, data, format='json')
        self.assertEqual(response['data']['ID'], Response.data['data']['ID'])
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        create_comment_on_post_mock.assert_called_once()

    def test_create_comment_on_post_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-create-comment-on-post', kwargs={"pk": 13})
        data = {"content": "i dont like this post"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_single_comment')
    def test_get_single_comment(self, get_single_comment_mock):
        response = {'data': {'ID': 2, 'post': {'ID': 13, 'title': 'extra post', 'type': 'post',
                                               'link': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13'},
                             'author': {'ID': 230036407, 'login': '', 'email': 'muhammad.shoaib@crowdbotics.com',
                                        'name': 'Shoaib Amjad', 'first_name': '', 'last_name': '', 'nice_name': '',
                                        'URL': 'http://dummy15.wordpress.com',
                                        'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                        'profile_URL': 'https://en.gravatar.com/8e49bfafb5fbca11b982d26c4801a8a0',
                                        'ip_address': '39.53.74.22'}, 'date': '2023-01-12T15:51:43+05:00',
                             'URL': 'https://dummy15.wordpress.com/2023/01/11/extra-post-2/comment-page-1/#comment-2',
                             'short_URL': 'https://wp.me/petk36-d%23comment-2',
                             'content': '<p>i dont like this post</p>\n', 'raw_content': 'i dont like this post',
                             'status': 'approved', 'parent': False, 'type': 'comment', 'like_count': 0, 'i_like': False,
                             'meta': {'links': {
                                 'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2',
                                 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/help',
                                 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                                 'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13',
                                 'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/replies/',
                                 'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/2/likes/'}},
                             'can_moderate': True, 'i_replied': False}, 'status_code': 200, 'success': True}
        get_single_comment_mock.return_value = response
        url = reverse('wordpress_comments-get-single-comment', kwargs={"pk": 2})
        self.Response = self.client.get(url)
        self.assertEqual(response['data']['ID'], self.Response.data['data']['ID'])
        self.assertEqual(self.Response.status_code, status.HTTP_200_OK)
        get_single_comment_mock.assert_called_once()

    def test_get_single_comment_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-get-single-comment', kwargs={"pk": 2})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_comment(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-edit-comment', kwargs={"pk": 2})
        data = {"content": "Sorry I dont like post"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_comment')
    def test_delete_comment(self, delete_comment_mock):
        responses = {'data': {'ID': 1, 'post': {'ID': 13, 'title': 'extra post', 'type': 'post',
                                                'link': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13'},
                              'author': {'ID': 230036407, 'login': '', 'email': 'muhammad.shoaib@crowdbotics.com',
                                         'name': 'Shoaib Amjad', 'first_name': '', 'last_name': '', 'nice_name': '',
                                         'URL': 'http://dummy15.wordpress.com',
                                         'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G',
                                         'profile_URL': 'https://en.gravatar.com/8e49bfafb5fbca11b982d26c4801a8a0',
                                         'ip_address': '39.53.74.22'}, 'date': '2023-01-12T15:50:21+05:00',
                              'URL': 'https://dummy15.wordpress.com/2023/01/11/extra-post-2/comment-page-1/#comment-1',
                              'short_URL': 'https://wp.me/petk36-d%23comment-1', 'content': '<p>nice post</p>\n',
                              'raw_content': 'nice post', 'status': 'trash', 'parent': False, 'type': 'comment',
                              'like_count': 0, 'i_like': False, 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                          'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13',
                          'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1/replies/',
                          'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1/likes/'}},
                              'can_moderate': True, 'i_replied': False}, 'status_code': 200, 'success': True}
        delete_comment_mock.return_value = responses
        url = reverse('wordpress_comments-delete-comment', kwargs={"pk": 1})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_comment_mock.assert_called_once()

    def test_delete_comment_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-delete-comment', kwargs={"pk": 2})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.like_comment')
    def test_like_comment(self, like_comment_mock):
        responses = {'data': {'success': True, 'i_like': True, 'like_count': 1, 'meta': {
            'links': {'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1/likes/new/help',
                      'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13',
                      'comment': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1',
                      'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}, 'status_code': 200,
                     'success': True}
        like_comment_mock.return_value = responses
        url = reverse('wordpress_comments-like-comment', kwargs={"pk": 1})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['like_count'], response.data['data']['like_count'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        like_comment_mock.assert_called_once()

    def test_like_comment_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-like-comment', kwargs={"pk": 1})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.unlike_comment')
    def test_unlike_comment(self, unlike_comment_mock):
        responses = {'data': {'success': True, 'i_like': False, 'like_count': 0, 'meta': {'links': {
            'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1/likes/mine/delete/help',
            'post': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/13',
            'comment': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/comments/1',
            'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}, 'status_code': 200,
                     'success': True}
        unlike_comment_mock.return_value = responses
        url = reverse('wordpress_comments-unlike-comment', kwargs={"pk": 1})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['like_count'], response.data['data']['like_count'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        unlike_comment_mock.assert_called_once()

    def test_unlike_comment_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_comments-unlike-comment', kwargs={"pk": 1})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressTaxonomyTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_site_categories')
    def test_get_list_of_site_categories(self, get_list_of_site_categories_mock):
        responses = {'data': {'found': 3, 'categories': [
            {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '', 'post_count': 6,
             'feed_url': 'https://dummy15.wordpress.com/category/uncategorized/feed/', 'parent': 0, 'meta': {'links': {
                'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized',
                'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help',
                'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}]}, 'status_code': 200,
                     'success': True}
        get_list_of_site_categories_mock.return_value = responses
        url = reverse('wordpress_taxonomy-get-list-of-site-categories')
        response = self.client.get(url)
        self.assertEqual(responses['data']['categories'], response.data['data']['categories'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_site_categories_mock.assert_called_once()

    def test_get_list_of_site_categories_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-get-list-of-site-categories')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.create_category')
    def test_create_category(self, create_category_mock):
        responses = {
            'data': {'ID': 75388, 'name': 'my category', 'slug': 'my-category', 'description': 'for posting app',
                     'post_count': 0, 'feed_url': 'https://dummy15.wordpress.com/category/api/my-category/feed/',
                     'parent': 4276, 'meta': {'links': {
                    'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:my-category',
                    'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:my-category/help',
                    'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}, 'status_code': 200,
            'success': True}
        create_category_mock.return_value = responses
        url = reverse('wordpress_taxonomy-create-category')
        data = {
            "name": "my category",
            "description": "for posting app",
            "parent": 4276
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_category_mock.assert_called_once()

    def test_create_category_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-create-category')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.edit_category')
    def test_edit_category(self, edit_category_mock):
        responses = {'data': {'ID': 4308839, 'name': 'my new category', 'slug': 'my-new-category',
                              'description': 'for app only ', 'post_count': 0,
                              'feed_url': 'https://dummy15.wordpress.com/category/api/my-new-category/feed/',
                              'parent': 4276, 'meta': {'links': {
                'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:my-new-category',
                'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:my-new-category/help',
                'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}, 'status_code': 200,
                     'success': True}
        edit_category_mock.return_value = responses
        url = reverse('wordpress_taxonomy-edit-category', kwargs={"pk": 'my-category'})
        data = {
            "name": "my new category",
            "description": "for app only ",
            "parent": 4276
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        edit_category_mock.assert_called_once()

    def test_edit_category_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-edit-category', kwargs={"pk": 'my-category'})
        data = {
            "name": "my new category",
            "description": "for app only ",
            "parent": 4276
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_category')
    def test_delete_category(self, delete_category_mock):
        responses = {'data': {'slug': 'my-new-category', 'success': 'true'}, 'status_code': 200, 'success': True}
        delete_category_mock.return_value = responses
        url = reverse('wordpress_taxonomy-delete-category', kwargs={"pk": "my-new-category"})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['slug'], response.data['data']['slug'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_category_mock.assert_called_once()

    def test_delete_category_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-delete-category', kwargs={"pk": "my-new-category"})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_site_tags')
    def test_get_list_of_site_tags(self, get_list_of_site_tags_mock):
        responses = {'data': {'found': 2, 'tags': [
            {'ID': 540526, 'name': 'string', 'slug': 'string', 'description': '', 'post_count': 1,
             'feed_url': 'https://dummy15.wordpress.com/tag/string/feed/', 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:string',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:string/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}},
            {'ID': 2436, 'name': 'tests', 'slug': 'tests', 'description': '', 'post_count': 1,
             'feed_url': 'https://dummy15.wordpress.com/tag/tests/feed/', 'meta': {
                'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:tests',
                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:tests/help',
                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}]}, 'status_code': 200,
                     'success': True}
        get_list_of_site_tags_mock.return_value = responses
        url = reverse('wordpress_taxonomy-get-list-of-site-tags')
        response = self.client.get(url)
        self.assertEqual(responses['data']['tags'], response.data['data']['tags'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_site_tags_mock.assert_called_once()

    def test_get_list_of_site_tags_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-get-list-of-site-tags')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.create_tag')
    def test_create_tag(self, create_tag_mock):
        responses = {
            'data': {'ID': 21715410, 'name': 'my new tag', 'slug': 'my-new-tag', 'description': 'for app only ',
                     'post_count': 0, 'feed_url': 'https://dummy15.wordpress.com/tag/my-new-tag/feed/', 'meta': {
                    'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:my-new-tag',
                              'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:my-new-tag/help',
                              'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}},
            'status_code': 200, 'success': True}
        create_tag_mock.return_value = responses
        url = reverse('wordpress_taxonomy-create-tag')
        data = {
            "name": "my new tag",
            "description": "for app only "
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_tag_mock.assert_called_once()

    def test_create_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-create-tag')
        data = {
            "name": "my new tag",
            "description": "for app only "
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.edit_tag')
    def test_edit_tag(self, edit_tag_mock):
        responses = {
            'data': {'ID': 758797164, 'name': 'my newest tag', 'slug': 'my-newest-tag', 'description': 'private',
                     'post_count': 0, 'feed_url': 'https://dummy15.wordpress.com/tag/my-newest-tag/feed/', 'meta': {
                    'links': {
                        'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:my-newest-tag',
                        'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/tags/slug:my-newest-tag/help',
                        'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}, 'status_code': 200,
            'success': True}
        edit_tag_mock.return_value = responses
        url = reverse('wordpress_taxonomy-edit-tag', kwargs={"pk": "my-new-tag"})
        data = {
            "name": "my newest tag",
            "description": "private"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['ID'], response.data['data']['ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        edit_tag_mock.assert_called_once()

    def test_edit_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-edit-tag', kwargs={"pk": "my-new-tag"})
        data = {
            "name": "my newest tag",
            "description": "private"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_tag')
    def test_delete_tag(self, delete_tag_mock):
        responses = {'data': {'slug': 'my-newest-tag', 'success': 'true'}, 'status_code': 200, 'success': True}
        delete_tag_mock.return_value = responses
        url = reverse('wordpress_taxonomy-delete-tag', kwargs={"pk": "my-newest-tag"})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['slug'], response.data['data']['slug'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_tag_mock.assert_called_once()

    def test_delete_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_taxonomy-delete-tag', kwargs={"pk": "my-newest-tag"})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressFollowTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.follow_blog')
    def test_follow_blog(self, follow_blog_mock):
        responses = {'data': {'success': True, 'is_following': True, 'meta': {
            'links': {'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                      'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/follows/new/help',
                      'posts': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/'}}},
                     'status_code': 200, 'success': True}
        follow_blog_mock.return_value = responses
        url = reverse('wordpress_follow-follow-blog')
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['is_following'], response.data['data']['is_following'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        follow_blog_mock.assert_called_once()

    def test_follow_blog_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_follow-follow-blog')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.unfollow_blog')
    def test_unfollow_blog(self, unfollow_blog_mock):
        responses = {'data': {'success': True, 'is_following': False, 'meta': {
            'links': {'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288',
                      'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/follows/mine/delete/help',
                      'posts': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/'}}},
                     'status_code': 200, 'success': True}
        unfollow_blog_mock.return_value = responses
        url = reverse('wordpress_follow-unfollow-blog')
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['is_following'], response.data['data']['is_following'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        unfollow_blog_mock.assert_called_once()

    def test_unfollow_blog_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_follow-unfollow-blog')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressFreshlyPressedTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_freshly_pressed_posts')
    def test_get_freshly_pressed_posts(self, get_freshly_pressed_posts_mock):
        responses = {
            'data': {'date_range': {'newest': '2016-07-28T16:36:46+00:00', 'oldest': '2015-11-19T16:02:02+00:00'},
                     'number': 9, 'posts': [{'ID': 5270, 'site_ID': 4042294,
                                             'author': {'ID': 4278874, 'login': 'gaiavince', 'email': False,
                                                        'name': 'Gaia', 'first_name': 'Gaia', 'last_name': 'Vince',
                                                        'nice_name': 'gaiavince', 'URL': 'http://',
                                                        'avatar_URL': 'https://0.gravatar.com/avatar/93398742b4a0f095168e2bacfc30cbba?s=96&d=identicon&r=G',
                                                        'profile_URL': 'https://en.gravatar.com/gaiavince',
                                                        'ip_address': False, 'site_ID': 4042294, 'site_visible': True},
                                             'date': '2014-07-08T09:05:03+00:00',
                                             'modified': '2019-09-27T10:04:34+00:00',
                                             'title': 'Homni: The new superorganism taking over Earth',
                                             'URL': 'http://wanderinggaia.com/2014/07/08/homni-the-new-superorganism-taking-over-earth/',
                                             'short_URL': 'https://wp.me/pgXAi-1n0',
                                             'content': '<p>In Ancient Greek mythology, the Earth Goddess Gaia had nine titan sons, who attempted to control not just the Earth, but the entire Universe. I’d like to introduce another. It’s a new creature who emerged only in recent decades. But it’s a creature who is already as influential over life on the planet as the phytoplankton or forests that regulate global temperature, the weather and the air we breathe.</p>\n<p>That new creature is us, or more precisely, what humanity is becoming. The entirety of our species, <i>Homo sapiens</i>, is evolving into a superorganism; I’ll call this new life force <i>Homo omnis</i>, or ‘Homni’.</p>\n<p>We have now become the dominant force shaping our planet. Some say that because of our actions we have entered a new geological epoch: <a href="http://www.bbc.com/future/story/20120209-welcome-to-the-age-of-modern-man">the Anthropocene</a>, or the age of man. Homni is a product of this age, a product of human industrialisation, population expansion, globalisation and the revolution in communications technology, and he is immensely powerful. Homni can influence the biosphere, and has needs – currently, he uses <a href="http://www.eia.gov/cfapps/ipdbproject/iedindex3.cfm">18 terawatts</a> (trillion watts) of energy at any time, <a href="http://www.scientificamerican.com/article/graphic-science-how-much-water-nations-consume/">9,000 billion cubic metres of water</a> per year, <a href="http://news.nationalgeographic.com/news/2005/12/1209_051209_crops_map.html">40% of global land area</a> for farming, and a plethora of other natural and mineral resources.</p>\n<p>Only time will tell if he will be a benign caretaker, or a monster that destroys life and with it himself. But there are clues, and here I will examine what Homni is, and what he means for our species, the planet and the rest of life on Earth.</p>\n<p><b>Crowd power</b></p>\n<p>To understand Homni, let me first take you down into the soil to consider one of the most simple and ancient single-celled organisms, an amoeba called a slime mould. It evolved some 600 million years ago, and occupies soils across the world, from Antarctica to the Arctic. For most of its life-cycle, the cell lives the unexceptional life of most amoeba. But sometimes, these single cells <a href="http://www.nytimes.com/2011/10/04/science/04slime.html?pagewanted=all">gather in their thousands to create an organism</a>, encased in its own slime, that can creep, crawl, pulsate, grow tentacles and even negotiate a maze.</p>\n<p>Scientists describe these slime moulds as ‘societies’ because of the way the individual amoebae work together towards a common cause, sometimes sacrificing themselves on the way. For example, if food is scarce in their soil patch, the amoeba coalesce together forming a tendril that creeps up to the light. Once it has reached the surface, a portion of them form a stalk above ground, by turning their bodies into hard cellulose – a process that kills them. The rest of the mould then climbs the stalk and waits in a blob at the top for a passing animal to transport them to new soils. All this, from the simplest organism.</p>\n<p>The human brain is a bit like the mould. Each single brain cell, or neuron, cannot be described as conscious or sentient, and yet, when all 86 billion neurons are networked together, the human brain is far, far more than the sum of its parts, capable of thinking and processing ideas in original ways. We still don’t understand how thoughts or personality or behaviours are seeded and take root in this network, or how the neurons become organised to drive such processes, but somehow consciousness is created from the most prosaic building materials.</p>\n<p><a href="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg"><img loading="lazy" data-attachment-id="5279" data-permalink="http://wanderinggaia.com/2014/07/08/homni-the-new-superorganism-taking-over-earth/rocina/" data-orig-file="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg" data-orig-size="333,500" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;}" data-image-title="rocina" data-image-description="" data-image-caption="" data-medium-file="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg?w=200" data-large-file="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg?w=333" class="aligncenter size-medium wp-image-5279" src="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg?w=199&#038;h=300" alt="rocina" width="199" height="300" srcset="https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg?w=199&amp;h=300 199w, https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg?w=100&amp;h=150 100w, https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg 333w" sizes="(max-width: 199px) 100vw, 199px" /></a></p>\n<p>We can describe the intelligence, creativity and sociability of Homni as being comparable to the networked, linked-up, conversational accumulation of all the human brains, including those from the past who have left a cultural and intellectual legacy, and also the artificial ‘brains’ of our technological inventions, such as computer programs and Wikipedia. Homni is a global network of civilisations with a stream of knowledge already being channelled for human protection. Just as a cloud of starlings suddenly flips direction en masse, it is difficult to predict how Homni’s behaviour will play out.</p>\n<p>But this is just one aspect of Homni.</p>\n<p><b>&#8216;Artificial Man&#8217;</b></p>\n<p>Not long ago, I sat in a rainforest in Belize, watching a troop of fire ants at work. Individually, each is a formidable beast, a few centimetres long but with a powerful bite. But together, they form what entomologist EO Wilson described as a superorganism of thousands of organised ants that systematically devours everything in its path, tearing down trees and crops and stripping the insulation off wiring and other electrical equipment. In some places the ants run a protection racket for other aphids and bugs, <a href="http://blogs.discovermagazine.com/notrocketscience/2011/12/05/fire-ants-conquered-america-by-monopolising-calorie-rich-food/#more-5921">which supply them with nectar</a>. And the superorganism has even figured out a way of surviving heavy rainfall, by clinging to each other and <a href="http://www.pnas.org/content/108/19/7669.long">forming a floating life raft</a> in times of flooding. Once they’ve exhausted their environment’s resources, the entire community ups and moves to pastures new. Ants are sophisticated farmers – pre-dating human farmers by more than 50 million years – and they also raise and milk livestock (aphids), they build complex residences, keep slaves, and wage massive battles that involve psychological warfare. The comparisons with humans are multiple.</p>\n<p>Applying the idea of superorganisms to humanity is more complicated – individually, we are more autonomous than cells, or even ants. But over the centuries, the idea has emerged in many different guises. The Ancient Greeks imagined each of us as cells in the greater being. Others have referred to the roles that different parts of society play – such as generating energy or food – as analogous to organs in a body. The 17th Century English philosopher Thomas Hobbes also described society as forming an &#8216;Artificial Man&#8217; that functions (through civilisation) in a way as to ensure its own survival.</p>\n<p>Now, as we advance into the Anthropocene, we are seeing these ideas put into practice on an unprecedented scale. While individual humans or societies can exert a local or regional effect on landscapes, water flow or biodiversity, the impact of our superspecies is planetary. Homni now controls three-quarters of Earth’s freshwater supplies, has modified <a href="http://ecotope.org/people/ellis/papers/ellis_2008.pdf">more than three-quarters</a> of ice-free land surface, and modulates the planet&#8217;s air, biodiversity, and oceanic chemistry and biology. Homni has even started <a href="http://www.bbc.com/future/story/20120518-danger-space-junk-alert">littering space</a> with telescopes, satellites and other artificial junk. Homni’s actions are like the environmental rampaging of Argentinian ants on a global scale.</p>\n<p>Increasingly, individual people are less and less able to function independently in modern society – we rely on the superorganism to feed, clothe and power our many tools, to inform and heal us, even to help us reproduce through surrogacy or IVF. In coming decades, it is likely that access to the internet will have reached <a href="http://www.bbc.com/future/story/20140214-the-last-places-without-internet">almost every part of the globe</a> and, as we become more cohesive as a networked society, individuals who remain outside of the new superorganism will find themselves isolated culturally and technologically from what it means to be a human in the Anthropocene.</p>\n<p>In the coming decades, it is also likely that access to electricity, sanitation and antibiotics will become near universal – thus, describing a human in the Anthropocene will increasingly assume a doubled lifespan and basic awareness of the scientific, geopolitical, cultural and social factors behind how the world operates. The result will be a new way of living that is almost akin to being a new subspecies. It is the new modern human that created the Anthropocene and gave rise to Homni, but it is Homni who now sculpts the new human.</p>\n<p><b>Monster issues</b></p>\n<p>And here lies an interesting paradox. Humans may have evolved through a process of natural selection – essentially outcompeting rivals to death – but as <a href="http://www.theguardian.com/commentisfree/video/2011/apr/04/tim-flannery-global-shared-beliefs-video">palaeontologist Tim Flannery</a> says, this has led not to a &#8220;dog-eat-dog world&#8221;, but to a cooperative society. He believes we are in the process of forming an interdependent global society with a set of shared beliefs – a &#8220;civilisation of ideas&#8221; – that will transform Earth into a more equitable and ecologically curated planet. It&#8217;s an optimistic view of Homni, based on the fact that most people want to get on with each other and look after their neighbourhood environment. Whether, or to what degree, Flannery&#8217;s altruistic view of humanity bears out is the big question.</p>\n<p>Individuals may exert an influence over Homni to some degree, rather like the single neuron that fires off a signal, starting an original thought, which then progresses to a painting, song or an invention like the iPod. Or the individual who sends a single tweet that then becomes an internet meme propagating and evolving through the internet. The “tipping point” is thought to be low: just 10% are needed to hold a new belief before it <a href="http://news.rpi.edu/luwakkey/2902">spreads to the majority of the population</a>.</p>\n<p>Although individuals may be able to steer Homni to some level, it is far from obvious how we might do this to ensure our survival through the Anthropocene. Homni’s influence is already being seen in planetary changes unprecedented for millions of years, affecting humans and our relationship to the natural world. We are changing the climate by increasing the level of carbon dioxide in the atmosphere; we&#8217;re reducing the planet&#8217;s biodiversity, causing what scientists fear may be the <a href="http://www.nature.com/nature/journal/v471/n7336/full/nature09678.html">sixth mass extinction</a> in its history; and terraforming Earth&#8217;s land surface with multiple megacities of concrete, steel and glass. Deciding as an individual to reduce freshwater waste, or cut my carbon footprint has negligible impact on the state of the world&#8217;s rivers or global temperature.</p>\n<p>Homni is essentially a concept – I invented him because our superorganism has characteristics that go beyond the simple accumulation of humans. In other examples from the animal world, like bee hives or ant nests, killing the queen results in the collapse of the entire colony. Homni has no single queen, though, and in this way he is as robust as a forest. It would take a catastrophe on an epic scale – an epidemic, massive environmental change, an asteroid impact, or nuclear war – to possibly kill Homni, leaving a straggle of human survivors.</p>\n<p>But our impulse would always be to strengthen rather than kill Homni – we are social collaborators and most of our recent discoveries, inventions and successes have been born out of group effort. And the secret to ensuring a better Anthropocene is in recognising Homni&#8217;s power, but also nurturing his human side, the side committed to improving relations with the neighbours and cleaning up the neighbourhood. Will we achieve this through global international agreements? Possibly. I think that increasingly, as we see through a network of eyes, in the form of the many powerful satellites and remote cameras that track individual trees in rainforests or reveal the extent of glacial carving, we will start to read Homni’s mind, and have more nuanced control over his actions.</p>\n<p>Maybe then we will begin to use the power of Homni to restore and curate the planet. The alternative is too monstrous to contemplate.</p>\n<p><em>This article <a href="http://www.bbc.com/future/story/20140701-the-superorganism-engulfing-earth" target="_blank">first appeared on BBC Future</a>. My book </em><strong>Adventures In The Anthropocene: A Journey to the Heart of the Planet We Made</strong><em> is available <a href="http://www.amazon.co.uk/Adventures-Anthropocene-Journey-Heart-Planet/dp/0701187344" target="_blank">online</a> and in bookstores.</em></p>\n',
                                             'excerpt': '<p>In Ancient Greek mythology, the Earth Goddess Gaia had nine titan sons, who attempted to control not just the Earth, but the entire Universe. I’d like to introduce another. It’s a new creature who emerged only in recent decades. But it’s a creature who is already as influential over life on the planet as the [&hellip;]</p>\n',
                                             'slug': 'homni-the-new-superorganism-taking-over-earth',
                                             'guid': 'http://wanderinggaia.com/?p=5270', 'status': 'publish',
                                             'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                                             'comments_open': True, 'pings_open': True, 'likes_enabled': True,
                                             'sharing_enabled': True, 'comment_count': 70, 'like_count': 881,
                                             'i_like': False, 'is_reblogged': False, 'is_following': False,
                                             'global_ID': '798e118abcc36c9daaab3f8c938f8e19', 'featured_image': '',
                                             'post_thumbnail': None, 'format': 'standard', 'geo': False,
                                             'menu_order': 0, 'publicize_URLs': [], 'tags': {
                                                'ADVENTURES IN THE ANTHROPOCENE': {'ID': 331408322,
                                                                                   'name': 'ADVENTURES IN THE ANTHROPOCENE',
                                                                                   'slug': 'adventures-in-the-anthropocene',
                                                                                   'description': 'Adventures In The Anthropocene',
                                                                                   'post_count': 36,
                                                                                   'feed_url': 'http://wanderinggaia.com/tag/adventures-in-the-anthropocene/feed/',
                                                                                   'meta': {'links': {
                                                                                       'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:adventures-in-the-anthropocene',
                                                                                       'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:adventures-in-the-anthropocene/help',
                                                                                       'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294'}}},
                                                'anthropocene': {'ID': 375137, 'name': 'anthropocene',
                                                                 'slug': 'anthropocene', 'description': '',
                                                                 'post_count': 10,
                                                                 'feed_url': 'http://wanderinggaia.com/tag/anthropocene/feed/',
                                                                 'meta': {'links': {
                                                                     'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:anthropocene',
                                                                     'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:anthropocene/help',
                                                                     'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294'}}},
                                                'Opinion': {'ID': 352, 'name': 'Opinion', 'slug': 'opinion',
                                                            'description': '', 'post_count': 94,
                                                            'feed_url': 'http://wanderinggaia.com/tag/opinion/feed/',
                                                            'meta': {'links': {
                                                                'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:opinion',
                                                                'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/tags/slug:opinion/help',
                                                                'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294'}}}},
                                             'categories': {'BOOKS': {'ID': 178, 'name': 'BOOKS', 'slug': 'books',
                                                                      'description': '', 'post_count': 87,
                                                                      'feed_url': 'http://wanderinggaia.com/category/books/feed/',
                                                                      'parent': 0, 'meta': {'links': {
                                                     'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/categories/slug:books',
                                                     'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/categories/slug:books/help',
                                                     'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294'}}},
                                                            'Latest': {'ID': 13493, 'name': 'Latest', 'slug': 'latest',
                                                                       'description': '', 'post_count': 164,
                                                                       'feed_url': 'http://wanderinggaia.com/category/latest/feed/',
                                                                       'parent': 0, 'meta': {'links': {
                                                                    'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/categories/slug:latest',
                                                                    'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/categories/slug:latest/help',
                                                                    'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294'}}}},
                                             'attachments': {'5279': {'ID': 5279,
                                                                      'URL': 'https://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg',
                                                                      'guid': 'http://wanderinggaia.files.wordpress.com/2014/07/rocina.jpg',
                                                                      'mime_type': 'image/jpeg', 'width': 333,
                                                                      'height': 500}},
                                             'metadata': [{'id': '12804', 'key': 'geo_public', 'value': '0'},
                                                          {'id': '12807', 'key': '_wpas_done_1896860', 'value': '1'},
                                                          {'id': '12811', 'key': '_wpas_done_1896866', 'value': '1'},
                                                          {'id': '12814', 'key': '_wpas_skip_1896860', 'value': '1'},
                                                          {'id': '12815', 'key': '_wpas_skip_1896866', 'value': '1'}],
                                             'meta': {'links': {
                                                 'self': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/posts/5270',
                                                 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/posts/5270/help',
                                                 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294',
                                                 'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/posts/5270/replies/',
                                                 'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/4042294/posts/5270/likes/'}},
                                             'current_user_can': {'publish_post': False, 'delete_post': False,
                                                                  'edit_post': False},
                                             'capabilities': {'publish_post': False, 'delete_post': False,
                                                              'edit_post': False},
                                             'pseudo_ID': '798e118abcc36c9daaab3f8c938f8e19', 'is_external': False,
                                             'site_name': 'Wandering Gaia', 'site_URL': 'http://wanderinggaia.com',
                                             'site_is_private': False, 'featured_media': {},
                                             'editorial': {'blog_id': '4042294', 'post_id': '5270',
                                                           'image': 'https://s1.wp.com/imgpress?w=252&url=http%3A%2F%2Fwanderinggaia.files.wordpress.com%2F2014%2F07%2Frocina.jpg&unsharpmask=80,0.5,3',
                                                           'custom_headline': 'Homni: The New Superorganism Taking Over Earth',
                                                           'custom_blog_title': '',
                                                           'displayed_on': '2015-11-19T16:02:02+00:00',
                                                           'picked_on': '1970-01-01T00:33:35+00:00',
                                                           'highlight_topic': 'environment',
                                                           'highlight_topic_title': 'Environment', 'screen_offset': '0',
                                                           'blog_name': 'Wandering Gaia', 'site_id': '1'}}]},
            'status_code': 200, 'success': True}
        get_freshly_pressed_posts_mock.return_value = responses
        url = reverse('wordpress_freshly_pressed-get-freshly-pressed-posts')
        response = self.client.get(url, format='json')
        self.assertEqual(responses['data']['date_range']['newest'], response.data['data']['date_range']['newest'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_freshly_pressed_posts_mock.assert_called_once()

    def test_get_freshly_pressed_posts_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_freshly_pressed-get-freshly-pressed-posts')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressInsightsTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_insights')
    def test_get_list_of_insights(self, get_list_of_insights_mock):
        responses = {'data': {'ID': 83370, 'name': 'test-app',
                              'insights': ['rest-api-calls', 'rest-api-writes', 'rest-api-reads', 'rest-api-errors',
                                           'api-insights-connections', 'api-insights-posts', 'api-insights-comments',
                                           'api-insights-likes'],
                              'today': {'rest_api_calls': {'number': None, 'percent': '%'},
                                        'rest_api_writes': {'number': None, 'percent': '%'},
                                        'rest_api_reads': {'number': None, 'percent': '%'},
                                        'rest_api_errors': {'number': None, 'percent': '%'},
                                        'api_insights_connections': {'number': None, 'percent': '-100%'},
                                        'api_insights_posts': {'number': None, 'percent': '-100%'},
                                        'api_insights_comments': {'number': '2', 'percent': '%'},
                                        'api_insights_likes': {'number': None, 'percent': '%'}}, 'has_custom': False},
                     'status_code': 200, 'success': True}
        get_list_of_insights_mock.return_value = responses
        url = reverse('wordpress_insights-get-list-of-insights')
        response = self.client.get(url)
        self.assertEqual(responses['data']['insights'], response.data['data']['insights'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_insights_mock.assert_called_once()

    def test_get_list_of_insights_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_insights-get-list-of-insights')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_raw_data_graph_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_insights-get-raw-data-graph', kwargs={"pk": "rest-api-calls"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressReaderTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_default_reader_menu')
    def test_get_default_reader_menu(self, get_default_reader_menu_mock):
        responses = {'data': {'default': {'following': {'title': 'Blogs I Follow',
                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/following'},
                                          'freshly-pressed': {'title': 'Freshly Pressed',
                                                              'URL': 'https://public-api.wordpress.com/rest/v1.1/freshly-pressed'},
                                          'liked': {'title': 'My Likes',
                                                    'URL': 'https://public-api.wordpress.com/rest/v1.1/read/liked'}},
                              'subscribed': [], 'recommended': {'2806': {'ID': 2806, 'title': 'Art &amp; Design',
                                                                         'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/art-design/posts',
                                                                         'slug': 'art-design',
                                                                         'display_name': 'art-design', 'type': 'tag'},
                                                                '178': {'ID': 178, 'title': 'Books',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/books/posts',
                                                                        'slug': 'books', 'display_name': 'books',
                                                                        'type': 'tag'}, '258845': {'ID': 258845,
                                                                                                   'title': 'Business &amp; Technology',
                                                                                                   'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/business-technology/posts',
                                                                                                   'slug': 'business-technology',
                                                                                                   'display_name': 'business-technology',
                                                                                                   'type': 'tag'},
                                                                '63611190': {'ID': 63611190,
                                                                             'title': 'Crafts &amp; Fashion',
                                                                             'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/crafts-fashion/posts',
                                                                             'slug': 'crafts-fashion',
                                                                             'display_name': 'crafts-fashion',
                                                                             'type': 'tag'},
                                                                '1098': {'ID': 1098, 'title': 'Culture',
                                                                         'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/culture/posts',
                                                                         'slug': 'culture', 'display_name': 'culture',
                                                                         'type': 'tag'},
                                                                '406': {'ID': 406, 'title': 'Family',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/family/posts',
                                                                        'slug': 'family', 'display_name': 'family',
                                                                        'type': 'tag'}, '960817': {'ID': 960817,
                                                                                                   'title': 'Fiction &amp; Poetry',
                                                                                                   'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/fiction-poetry/posts',
                                                                                                   'slug': 'fiction-poetry',
                                                                                                   'display_name': 'fiction-poetry',
                                                                                                   'type': 'tag'},
                                                                '586': {'ID': 586, 'title': 'Food',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/food/posts',
                                                                        'slug': 'food', 'display_name': 'food',
                                                                        'type': 'tag'},
                                                                '13985': {'ID': 13985, 'title': 'Health &amp; Wellness',
                                                                          'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/health-wellness/posts',
                                                                          'slug': 'health-wellness',
                                                                          'display_name': 'health-wellness',
                                                                          'type': 'tag'},
                                                                '376': {'ID': 376, 'title': 'Humor',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/humor/posts',
                                                                        'slug': 'humor', 'display_name': 'humor',
                                                                        'type': 'tag'},
                                                                '35328892': {'ID': 35328892, 'title': 'Longreads',
                                                                             'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/longreads/posts',
                                                                             'slug': 'longreads',
                                                                             'display_name': 'longreads',
                                                                             'type': 'tag'},
                                                                '3750': {'ID': 3750, 'title': 'Magazines',
                                                                         'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/magazines/posts',
                                                                         'slug': 'magazines',
                                                                         'display_name': 'magazines', 'type': 'tag'},
                                                                '10016773': {'ID': 10016773,
                                                                             'title': 'Musings &amp; Personal',
                                                                             'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/musings-personal/posts',
                                                                             'slug': 'musings-personal',
                                                                             'display_name': 'musings-personal',
                                                                             'type': 'tag'}, '84776': {'ID': 84776,
                                                                                                       'title': 'News &amp; Current Events',
                                                                                                       'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/news-current-events/posts',
                                                                                                       'slug': 'news-current-events',
                                                                                                       'display_name': 'news-current-events',
                                                                                                       'type': 'tag'},
                                                                '436': {'ID': 436, 'title': 'Photography',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/photography/posts',
                                                                        'slug': 'photography',
                                                                        'display_name': 'photography', 'type': 'tag'},
                                                                '87210105': {'ID': 87210105,
                                                                             'title': 'Popular Culture &amp; Entertainment',
                                                                             'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/popular-culture-entertainment/posts',
                                                                             'slug': 'popular-culture-entertainment',
                                                                             'display_name': 'popular-culture-entertainment',
                                                                             'type': 'tag'},
                                                                '26879': {'ID': 26879, 'title': 'Portfolios',
                                                                          'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/portfolios/posts',
                                                                          'slug': 'portfolios',
                                                                          'display_name': 'portfolios', 'type': 'tag'},
                                                                '116': {'ID': 116, 'title': 'Religion',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/religion/posts',
                                                                        'slug': 'religion', 'display_name': 'religion',
                                                                        'type': 'tag'},
                                                                '38881': {'ID': 38881, 'title': 'Science &amp; Nature',
                                                                          'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/science-nature/posts',
                                                                          'slug': 'science-nature',
                                                                          'display_name': 'science-nature',
                                                                          'type': 'tag'}, '1446729': {'ID': 1446729,
                                                                                                      'title': 'Sports &amp; Gaming',
                                                                                                      'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/sports-gaming/posts',
                                                                                                      'slug': 'sports-gaming',
                                                                                                      'display_name': 'sports-gaming',
                                                                                                      'type': 'tag'},
                                                                '200': {'ID': 200, 'title': 'Travel',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/travel/posts',
                                                                        'slug': 'travel', 'display_name': 'travel',
                                                                        'type': 'tag'},
                                                                '676': {'ID': 676, 'title': 'Websites',
                                                                        'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/websites/posts',
                                                                        'slug': 'websites', 'display_name': 'websites',
                                                                        'type': 'tag'}, '998458': {'ID': 998458,
                                                                                                   'title': 'Writing &amp; Blogging',
                                                                                                   'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/writing-blogging/posts',
                                                                                                   'slug': 'writing-blogging',
                                                                                                   'display_name': 'writing-blogging',
                                                                                                   'type': 'tag'}}},
                     'status_code': 200, 'success': True}
        get_default_reader_menu_mock.return_value = responses
        url = reverse('wordpress_reader-get-default-reader-menu')
        response = self.client.get(url)
        self.assertEqual(responses['data']['default']['following'], response.data['data']['default']['following'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_default_reader_menu_mock.assert_called_once()

    def test_get_default_reader_menu_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_reader-get-default-reader-menu')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_feed_details')
    def test_get_feed_details(self, get_feed_details_mock):
        responses = {'data': {'blog_ID': '0', 'feed_ID': '2806', 'name': '- Simplicity &amp; Reality -',
                              'URL': 'http://simplicityandreality.blogspot.com/',
                              'feed_URL': 'http://simplicityandreality.blogspot.com', 'subscribers_count': 2,
                              'is_following': False, 'last_update': None, 'last_checked': '2023-01-07T18:52:02+00:00',
                              'marked_for_refresh': False, 'next_refresh_time': '2023-01-15T18:52:02+00:00',
                              'organization_id': 0, 'unseen_count': 0,
                              'meta': {'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/read/feed/2806'}},
                              'resolved_feed_url': 'http://simplicityandreality.blogspot.com/'}, 'status_code': 200,
                     'success': True}
        get_feed_details_mock.return_value = responses
        url = reverse('wordpress_reader-get-feed-details', kwargs={"pk": 2806})
        response = self.client.get(url)
        self.assertEqual(responses['data']['feed_ID'], response.data['data']['feed_ID'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_feed_details_mock.assert_called_once()

    def test_get_feed_details_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_reader-get-feed-details', kwargs={"pk": 2806})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch(
        'modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_list_of_post_from_tag')
    def test_get_list_of_post_from_tag(self, get_list_of_post_from_tag_mock):
        responses = {
            'data': {'date_range': {'before': '2022-05-15T18:46:21+07:00', 'after': '2022-05-15T12:32:15+07:00'},
                     'number': 10, 'posts': [{'ID': 805, 'site_ID': 205554117,
                                              'author': {'ID': 220319694, 'login': 'tiwullele', 'email': False,
                                                         'name': 'Tiwul Lele', 'first_name': 'Tiwul',
                                                         'last_name': 'Lele', 'nice_name': 'tiwullele',
                                                         'URL': 'http://m66y3q4yj.wordpress.com',
                                                         'avatar_URL': 'https://1.gravatar.com/avatar/7a6c7177942958d03717aa1b622b551c?s=96&d=identicon&r=G',
                                                         'profile_URL': 'https://en.gravatar.com/tiwullele',
                                                         'ip_address': False, 'site_ID': 205554117,
                                                         'site_visible': True}, 'date': '2022-05-15T12:32:15+07:00',
                                              'modified': '2022-05-15T12:32:15+07:00',
                                              'title': '7z71h1yg18258e9e420205a',
                                              'URL': 'https://m66y3q4yj.wordpress.com/2022/05/15/7z71h1yg18258e9e420205a/',
                                              'short_URL': 'https://wp.me/pdUu0Z-cZ',
                                              'content': '<p><a href="https://groups.google.com/g/kal5ahntjd2/c/VC0d7musAUg" target="_blank">0205a</a> Quisque nec pellentesque ante. Nam vulputate, lorem fringilla tempus euismod, ex lectus ultricies quam, non tempus libero enim eget diam. Sed ac neque tincidunt, varius neque eu, suscipit dolor. Ut euismod lectus ac dolor finibus facilisis. Vestibulum non lorem tincidunt, finibus magna sed, feugiat ante. Nam fermentum felis in nisl mattis, nec auctor mauris tempor. Donec fringilla volutpat lacus ac bibendum. In a justo vel lacus sodales porta ut nec ipsum. Mauris cursus commodo neque, dictum tincidunt velit interdum ac. Aenean ac ipsum condimentum, condimentum ante non, dignissim arcu. Mauris leo augue, gravida sit amet lacus at, porttitor posuere orci. Donec mi arcu, eleifend vel venenatis id, ornare vel lorem.</p>\n',
                                              'excerpt': '<p>0205a Quisque nec pellentesque ante. Nam vulputate, lorem fringilla tempus euismod, ex lectus ultricies quam, non tempus libero enim eget diam. Sed ac neque tincidunt, varius neque eu, suscipit dolor. Ut euismod lectus ac dolor finibus facilisis. Vestibulum non lorem tincidunt, finibus magna sed, feugiat ante. Nam fermentum felis in nisl mattis, nec auctor mauris [&hellip;]</p>\n',
                                              'slug': '7z71h1yg18258e9e420205a',
                                              'guid': 'https://m66y3q4yj.wordpress.com/?p=805', 'status': 'publish',
                                              'sticky': False, 'password': '', 'parent': False, 'type': 'post',
                                              'comments_open': True, 'pings_open': True, 'likes_enabled': True,
                                              'sharing_enabled': True, 'comment_count': 0, 'like_count': 0,
                                              'i_like': False, 'is_reblogged': False, 'is_following': False,
                                              'global_ID': 'a016870148f48e416c2e88a31249f05c', 'featured_image': '',
                                              'post_thumbnail': None, 'format': 'standard', 'geo': False,
                                              'menu_order': 0, 'publicize_URLs': [], 'tags': {
                                                 '2': {'ID': 14407, 'name': '2', 'slug': '2', 'description': '',
                                                       'post_count': 185,
                                                       'feed_url': 'https://m66y3q4yj.wordpress.com/tag/2/feed/',
                                                       'meta': {'links': {
                                                           'self': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/tags/slug:2',
                                                           'help': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/tags/slug:2/help',
                                                           'site': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117'}}}},
                                              'categories': {
                                                  '27': {'ID': 249915, 'name': '27', 'slug': '27', 'description': '',
                                                         'post_count': 27,
                                                         'feed_url': 'https://m66y3q4yj.wordpress.com/category/27/feed/',
                                                         'parent': 0, 'meta': {'links': {
                                                          'self': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/categories/slug:27',
                                                          'help': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/categories/slug:27/help',
                                                          'site': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117'}}}},
                                              'attachments': {}, 'metadata': False, 'meta': {'links': {
                                                 'self': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/posts/805',
                                                 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/posts/805/help',
                                                 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117',
                                                 'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/posts/805/replies/',
                                                 'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/205554117/posts/805/likes/'}},
                                              'current_user_can': {'publish_post': False, 'delete_post': False,
                                                                   'edit_post': False},
                                              'capabilities': {'publish_post': False, 'delete_post': False,
                                                               'edit_post': False},
                                              'pseudo_ID': 'a016870148f48e416c2e88a31249f05c', 'is_external': False,
                                              'site_name': 'VncdYYf', 'site_URL': 'https://m66y3q4yj.wordpress.com',
                                              'site_is_private': False, 'featured_media': {}}]}, 'status_code': 200,
            'success': True}
        get_list_of_post_from_tag_mock.return_value = responses
        url = reverse('wordpress_reader-get-list-of-post-from-tag', kwargs={"pk": 2})
        response = self.client.get(url, format='json')
        self.assertEqual(responses['data']['date_range'], response.data['data']['date_range'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_of_post_from_tag_mock.assert_called_once()

    def test_get_list_of_post_from_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_reader-get-list-of-post-from-tag', kwargs={"pk": 2})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.subscribe_new_tag')
    def test_subscribe_new_tag(self, subscribe_new_tag_mock):
        responses = {'data': {'subscribed': True, 'tags': [
            {'ID': '14407', 'slug': '2', 'title': '2', 'display_name': '2',
             'URL': 'https://public-api.wordpress.com/rest/v1.1/read/tags/2/posts'}], 'added_tag': '14407'},
                     'status_code': 200, 'success': True}
        subscribe_new_tag_mock.return_value = responses
        url = reverse('wordpress_reader-subscribe-new-tag', kwargs={"pk": 2})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['subscribed'], response.data['data']['subscribed'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        subscribe_new_tag_mock.assert_called_once()

    def test_subscribe_new_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_reader-subscribe-new-tag', kwargs={"pk": 2})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.unsubscribe_tag')
    def test_unsubscribe_tag(self, unsubscribe_tag_mock):
        responses = {'data': {'subscribed': False, 'tags': [], 'removed_tag': '14407'}, 'status_code': 200,
                     'success': True}
        unsubscribe_tag_mock.return_value = responses
        url = reverse('wordpress_reader-unsubscribe-tag', kwargs={"pk": 2})
        response = self.client.post(url, format='json')
        self.assertEqual(responses['data']['subscribed'], response.data['data']['subscribed'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        unsubscribe_tag_mock.assert_called_once()

    def test_unsubscribe_tag_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_reader-unsubscribe-tag', kwargs={"pk": 2})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressStatsTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_site_stats')
    def test_get_site_stats(self, get_site_stats_mock):
        responses = {'data': {'date': '2023-01-12',
                              'stats': {'visitors_today': 0, 'visitors_yesterday': 0, 'visitors': 0, 'views_today': 0,
                                        'views_yesterday': 0, 'views_best_day': '', 'views_best_day_total': 0,
                                        'views': 0, 'comments': 0, 'posts': 8, 'followers_blog': 0,
                                        'followers_comments': 0, 'comments_per_month': 0,
                                        'comments_most_active_recent_day': '', 'comments_most_active_time': 'N/A',
                                        'comments_spam': 0, 'categories': 3, 'tags': 2, 'shares': 0,
                                        'shares_twitter': 0, 'shares_press-this': 0, 'shares_facebook': 0},
                              'visits': {'date': '2023-01-12', 'unit': 'day', 'fields': ['period', 'views', 'visitors'],
                                         'data': [['2022-12-14', 0, 0], ['2022-12-15', 0, 0], ['2022-12-16', 0, 0],
                                                  ['2022-12-17', 0, 0], ['2022-12-18', 0, 0], ['2022-12-19', 0, 0],
                                                  ['2022-12-20', 0, 0], ['2022-12-21', 0, 0], ['2022-12-22', 0, 0],
                                                  ['2022-12-23', 0, 0], ['2022-12-24', 0, 0], ['2022-12-25', 0, 0],
                                                  ['2022-12-26', 0, 0], ['2022-12-27', 0, 0], ['2022-12-28', 0, 0],
                                                  ['2022-12-29', 0, 0], ['2022-12-30', 0, 0], ['2022-12-31', 0, 0],
                                                  ['2023-01-01', 0, 0], ['2023-01-02', 0, 0], ['2023-01-03', 0, 0],
                                                  ['2023-01-04', 0, 0], ['2023-01-05', 0, 0], ['2023-01-06', 0, 0],
                                                  ['2023-01-07', 0, 0], ['2023-01-08', 0, 0], ['2023-01-09', 0, 0],
                                                  ['2023-01-10', 0, 0], ['2023-01-11', 0, 0], ['2023-01-12', 0, 0]]}},
                     'status_code': 200, 'success': True}
        get_site_stats_mock.return_value = responses
        url = reverse('wordpress_stats-get-site-stats')
        response = self.client.get(url)
        self.assertEqual(responses['data']['date'], response.data['data']['date'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_site_stats_mock.assert_called_once()

    def test_get_site_stats_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_stats-get-site-stats')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_site_stats_summary')
    def test_get_site_stats_summary(self, get_site_stats_summary_mock):
        responses = {
            'data': {'date': '2023-01-12', 'period': 'day', 'views': 0, 'visitors': 0, 'likes': 0, 'reblogs': 0,
                     'comments': 0, 'followers': 0}, 'status_code': 200, 'success': True}
        get_site_stats_summary_mock.return_value = responses
        url = reverse('wordpress_stats-get-site-stats-summary')
        response = self.client.get(url)
        self.assertEqual(responses['data']['date'], response.data['data']['date'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_site_stats_summary_mock.assert_called_once()

    def test_get_site_stats_summary_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_stats-get-site-stats-summary')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_post_views')
    def test_get_post_views(self, get_post_views_mock):
        responses = {'data': {'date': '2023-01-12', 'views': 0,
                              'years': {'1970': {'months': [], 'total': 0}, '1971': {'months': [], 'total': 0},
                                        '1972': {'months': [], 'total': 0}, '1973': {'months': [], 'total': 0},
                                        '1974': {'months': [], 'total': 0}, '1975': {'months': [], 'total': 0},
                                        '1976': {'months': [], 'total': 0}, '1977': {'months': [], 'total': 0},
                                        '1978': {'months': [], 'total': 0}, '1979': {'months': [], 'total': 0},
                                        '1980': {'months': [], 'total': 0}, '1981': {'months': [], 'total': 0},
                                        '1982': {'months': [], 'total': 0}, '1983': {'months': [], 'total': 0},
                                        '1984': {'months': [], 'total': 0}, '1985': {'months': [], 'total': 0},
                                        '1986': {'months': [], 'total': 0}, '1987': {'months': [], 'total': 0},
                                        '1988': {'months': [], 'total': 0}, '1989': {'months': [], 'total': 0},
                                        '1990': {'months': [], 'total': 0}, '1991': {'months': [], 'total': 0},
                                        '1992': {'months': [], 'total': 0}, '1993': {'months': [], 'total': 0},
                                        '1994': {'months': [], 'total': 0}, '1995': {'months': [], 'total': 0},
                                        '1996': {'months': [], 'total': 0}, '1997': {'months': [], 'total': 0},
                                        '1998': {'months': [], 'total': 0}, '1999': {'months': [], 'total': 0},
                                        '2000': {'months': [], 'total': 0}, '2001': {'months': [], 'total': 0},
                                        '2002': {'months': [], 'total': 0}, '2003': {'months': [], 'total': 0},
                                        '2004': {'months': [], 'total': 0}, '2005': {'months': [], 'total': 0},
                                        '2006': {'months': [], 'total': 0}, '2007': {'months': [], 'total': 0},
                                        '2008': {'months': [], 'total': 0}, '2009': {'months': [], 'total': 0},
                                        '2010': {'months': [], 'total': 0}, '2011': {'months': [], 'total': 0},
                                        '2012': {'months': [], 'total': 0}, '2013': {'months': [], 'total': 0},
                                        '2014': {'months': [], 'total': 0}, '2015': {'months': [], 'total': 0},
                                        '2016': {'months': [], 'total': 0}, '2017': {'months': [], 'total': 0},
                                        '2018': {'months': [], 'total': 0}, '2019': {'months': [], 'total': 0},
                                        '2020': {'months': [], 'total': 0}, '2021': {'months': [], 'total': 0},
                                        '2022': {'months': [], 'total': 0}, '2023': {'months': [], 'total': 0}},
                              'averages': {'1970': {'months': [], 'overall': 0}, '1971': {'months': [], 'overall': 0},
                                           '1972': {'months': [], 'overall': 0}, '1973': {'months': [], 'overall': 0},
                                           '1974': {'months': [], 'overall': 0}, '1975': {'months': [], 'overall': 0},
                                           '1976': {'months': [], 'overall': 0}, '1977': {'months': [], 'overall': 0},
                                           '1978': {'months': [], 'overall': 0}, '1979': {'months': [], 'overall': 0},
                                           '1980': {'months': [], 'overall': 0}, '1981': {'months': [], 'overall': 0},
                                           '1982': {'months': [], 'overall': 0}, '1983': {'months': [], 'overall': 0},
                                           '1984': {'months': [], 'overall': 0}, '1985': {'months': [], 'overall': 0},
                                           '1986': {'months': [], 'overall': 0}, '1987': {'months': [], 'overall': 0},
                                           '1988': {'months': [], 'overall': 0}, '1989': {'months': [], 'overall': 0},
                                           '1990': {'months': [], 'overall': 0}, '1991': {'months': [], 'overall': 0},
                                           '1992': {'months': [], 'overall': 0}, '1993': {'months': [], 'overall': 0},
                                           '1994': {'months': [], 'overall': 0}, '1995': {'months': [], 'overall': 0},
                                           '1996': {'months': [], 'overall': 0}, '1997': {'months': [], 'overall': 0},
                                           '1998': {'months': [], 'overall': 0}, '1999': {'months': [], 'overall': 0},
                                           '2000': {'months': [], 'overall': 0}, '2001': {'months': [], 'overall': 0},
                                           '2002': {'months': [], 'overall': 0}, '2003': {'months': [], 'overall': 0},
                                           '2004': {'months': [], 'overall': 0}, '2005': {'months': [], 'overall': 0},
                                           '2006': {'months': [], 'overall': 0}, '2007': {'months': [], 'overall': 0},
                                           '2008': {'months': [], 'overall': 0}, '2009': {'months': [], 'overall': 0},
                                           '2010': {'months': [], 'overall': 0}, '2011': {'months': [], 'overall': 0},
                                           '2012': {'months': [], 'overall': 0}, '2013': {'months': [], 'overall': 0},
                                           '2014': {'months': [], 'overall': 0}, '2015': {'months': [], 'overall': 0},
                                           '2016': {'months': [], 'overall': 0}, '2017': {'months': [], 'overall': 0},
                                           '2018': {'months': [], 'overall': 0}, '2019': {'months': [], 'overall': 0},
                                           '2020': {'months': [], 'overall': 0}, '2021': {'months': [], 'overall': 0},
                                           '2022': {'months': [], 'overall': 0}, '2023': {'months': [], 'overall': 0}},
                              'weeks': [{'days': [{'day': '2022-12-05', 'count': 0}, {'day': '2022-12-06', 'count': 0},
                                                  {'day': '2022-12-07', 'count': 0}, {'day': '2022-12-08', 'count': 0},
                                                  {'day': '2022-12-09', 'count': 0}, {'day': '2022-12-10', 'count': 0},
                                                  {'day': '2022-12-11', 'count': 0}], 'total': 0, 'average': 0,
                                         'change': None}, {'days': [{'day': '2022-12-12', 'count': 0},
                                                                    {'day': '2022-12-13', 'count': 0},
                                                                    {'day': '2022-12-14', 'count': 0},
                                                                    {'day': '2022-12-15', 'count': 0},
                                                                    {'day': '2022-12-16', 'count': 0},
                                                                    {'day': '2022-12-17', 'count': 0},
                                                                    {'day': '2022-12-18', 'count': 0}], 'total': 0,
                                                           'average': 0, 'change': 0}, {
                                            'days': [{'day': '2022-12-19', 'count': 0},
                                                     {'day': '2022-12-20', 'count': 0},
                                                     {'day': '2022-12-21', 'count': 0},
                                                     {'day': '2022-12-22', 'count': 0},
                                                     {'day': '2022-12-23', 'count': 0},
                                                     {'day': '2022-12-24', 'count': 0},
                                                     {'day': '2022-12-25', 'count': 0}], 'total': 0, 'average': 0,
                                            'change': 0}, {'days': [{'day': '2022-12-26', 'count': 0},
                                                                    {'day': '2022-12-27', 'count': 0},
                                                                    {'day': '2022-12-28', 'count': 0},
                                                                    {'day': '2022-12-29', 'count': 0},
                                                                    {'day': '2022-12-30', 'count': 0},
                                                                    {'day': '2022-12-31', 'count': 0},
                                                                    {'day': '2023-01-01', 'count': 0}], 'total': 0,
                                                           'average': 0, 'change': 0}, {
                                            'days': [{'day': '2023-01-02', 'count': 0},
                                                     {'day': '2023-01-03', 'count': 0},
                                                     {'day': '2023-01-04', 'count': 0},
                                                     {'day': '2023-01-05', 'count': 0},
                                                     {'day': '2023-01-06', 'count': 0},
                                                     {'day': '2023-01-07', 'count': 0},
                                                     {'day': '2023-01-08', 'count': 0}], 'total': 0, 'average': 0,
                                            'change': 0}, {'days': [{'day': '2023-01-09', 'count': 0},
                                                                    {'day': '2023-01-10', 'count': 0},
                                                                    {'day': '2023-01-11', 'count': 0},
                                                                    {'day': '2023-01-12', 'count': 0}], 'total': 0,
                                                           'average': 0, 'change': 0}], 'fields': ['period', 'views'],
                              'data': [['2023-01-10', 0], ['2023-01-11', 0], ['2023-01-12', 0]], 'highest_month': 0,
                              'highest_day_average': 0, 'highest_week_average': 0,
                              'post': {'ID': 20, 'post_author': '230036407', 'post_date': '2023-01-11 20:21:16',
                                       'post_date_gmt': '2023-01-11 15:21:16', 'post_content': '',
                                       'post_title': 'my new personal', 'post_excerpt': '', 'post_status': 'publish',
                                       'comment_status': 'open', 'ping_status': 'open', 'post_password': '',
                                       'post_name': 'my-new-personal', 'to_ping': '', 'pinged': '',
                                       'post_modified': '2023-01-11 20:21:16',
                                       'post_modified_gmt': '2023-01-11 15:21:16', 'post_content_filtered': '',
                                       'post_parent': 0,
                                       'guid': 'https://dummy15.wordpress.com/2023/01/11/my-new-personal/',
                                       'menu_order': 0, 'post_type': 'post', 'post_mime_type': '', 'comment_count': '0',
                                       'filter': 'raw',
                                       'permalink': 'http://dummy15.wordpress.com/2023/01/11/my-new-personal/'}},
                     'status_code': 200, 'success': True}
        get_post_views_mock.return_value = responses
        url = reverse('wordpress_stats-get-post-views', kwargs={"pk": 20})
        response = self.client.get(url)
        self.assertEqual(responses['data']['views'], response.data['data']['views'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_post_views_mock.assert_called_once()

    def test_get_post_views_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_stats-get-post-views', kwargs={"pk": 20})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_site_followers')
    def test_get_site_followers(self, get_site_followers_mock):
        responses = {'data': {'page': 1, 'pages': 0, 'total': 0, 'total_email': 0, 'total_wpcom': 0, 'subscribers': []},
                     'status_code': 200, 'success': True}
        get_site_followers_mock.return_value = responses
        url = reverse('wordpress_stats-get-site-followers')
        response = self.client.get(url)
        self.assertEqual(responses['data']['subscribers'], response.data['data']['subscribers'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_site_followers_mock.assert_called_once()

    def test_get_site_followers_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_stats-get-site-followers')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressMenuTestCase(APITestCase):

    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.create_navigation_menu')
    def test_create_navigation_menu(self, create_navigation_menu_mock):
        responses = {'data': {'id': 758797165}, 'status_code': 200, 'success': True}
        create_navigation_menu_mock.return_value = responses
        url = reverse('wordpress_menu-create-navigation-menu')
        data = {"name": "shoaib"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['id'], response.data['data']['id'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_navigation_menu_mock.assert_called_once()

    def test_create_navigation_menu_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_menu-create-navigation-menu')
        data = {"name": "shoaib"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.update_navigation_menu')
    def test_update_navigation_menu(self, update_navigation_menu_mock):
        responses = {
            'data': {'menu': {'id': 758797165, 'name': 'amjad', 'description': '', 'items': [], 'locations': []}},
            'status_code': 200, 'success': True}
        update_navigation_menu_mock.return_value = responses
        url = reverse('wordpress_menu-update-navigation-menu', kwargs={"pk": 758797165})
        data = {"name": "amjad"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(responses['data']['menu']['id'], response.data['data']['menu']['id'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_navigation_menu_mock.assert_called_once()

    def test_update_navigation_menu_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_menu-update-navigation-menu', kwargs={"pk": 758797165})
        data = {"name": "amjad"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.get_all_navigation_menu')
    def test_get_all_navigation_menu(self, get_all_navigation_menu_mock):
        responses = {
            'data': {'menus': [{'id': 758797165, 'name': 'amjad', 'description': '', 'items': [], 'locations': []}],
                     'locations': []}, 'status_code': 200, 'success': True}
        get_all_navigation_menu_mock.return_value = responses
        url = reverse('wordpress_menu-get-all-navigation-menu')
        response = self.client.get(url)
        self.assertEqual(responses['data']['menus'], response.data['data']['menus'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_all_navigation_menu_mock.assert_called_once()

    def test_get_all_navigation_menu_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_menu-get-all-navigation-menu')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_navigation_menu')
    def test_delete_navigation_menu(self, delete_navigation_menu_mock):
        responses = {'data': {'deleted': True}, 'status_code': 200, 'success': True}
        delete_navigation_menu_mock.return_value = responses
        url = reverse('wordpress_menu-delete-navigation-menu', kwargs={"pk": 758797165})
        response = self.client.post(url)
        self.assertEqual(responses['data']['deleted'], response.data['data']['deleted'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_navigation_menu_mock.assert_called_once()

    def test_delete_navigation_menu_without_token(self):
        self.client.force_authenticate(token=None)
        url = reverse('wordpress_menu-delete-navigation-menu', kwargs={"pk": 758797165})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
