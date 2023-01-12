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
        response = {'access_token': 'xyvAxL6RL@RbE2VXahCT0VX33kLZDsiT3JX@5bTSZ@Zj@#0PTVZnLoU9qpl$64Ru',
                    'token_type': 'bearer', 'blog_id': '213857288', 'blog_url': 'http://dummy15.wordpress.com',
                    'scope': ''}
        get_auth_token_mock.return_value = response
        self.client.credentials(HTTP_WORDPRESS_CODE=self.code)
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressBase.get_auth_token')
    def test_get_auth_token_with_expire_code(self, get_auth_token_mock):
        response = None
        get_auth_token_mock.return_value = response
        self.client.credentials(HTTP_WORDPRESS_CODE=self.code)
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressBase.get_auth_token')
    def test_get_auth_token_without_code(self, get_auth_token_mock):
        response = None
        get_auth_token_mock.return_value = response
        url = reverse('wordpress_auth-get-auth-token')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WordpressPostsTestCase(APITestCase):
    def setUp(self):
        self.access_token = os.getenv("WORDPRESS_ACCESS_TOKEN")

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_single_post')
    def test_delete_single_post(self, delete_single_mock):
        response = {'data': {'ID': 11, 'site_ID': '213857288', 'author': {'ID': 230036407, 'login': 'muhammadshoaibeacfc7849e', 'email': False, 'name': 'Shoaib Amjad', 'first_name': 'Shoaib', 'last_name': 'Amjad', 'nice_name': 'muhammadshoaibeacfc7849e', 'URL': 'http://dummy15.wordpress.com', 'avatar_URL': 'https://2.gravatar.com/avatar/8e49bfafb5fbca11b982d26c4801a8a0?s=96&d=identicon&r=G', 'profile_URL': 'https://en.gravatar.com/muhammadshoaibeacfc7849e', 'site_ID': 213857288}, 'date': '2023-01-11T14:11:00+05:00', 'modified': '2023-01-11T20:53:06+05:00', 'title': 'editings in post', 'URL': 'https://dummy15.wordpress.com/?p=11', 'short_URL': 'https://wp.me/petk36-b', 'content': '', 'excerpt': '', 'slug': 'my-personal-post__trashed', 'guid': 'https://dummy15.wordpress.com/2023/01/11/my-personal-post/', 'status': 'trash', 'sticky': False, 'password': '', 'parent': False, 'type': 'post', 'discussion': {'comments_open': True, 'comment_status': 'open', 'pings_open': True, 'ping_status': 'open', 'comment_count': 0}, 'likes_enabled': True, 'sharing_enabled': True, 'like_count': 0, 'i_like': False, 'is_reblogged': False, 'is_following': True, 'global_ID': 'ac097acedaaafa4be16b0ebc636df2ee', 'featured_image': '', 'post_thumbnail': None, 'format': 'standard', 'geo': False, 'menu_order': 0, 'page_template': '', 'publicize_URLs': [], 'terms': {'category': {'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '', 'post_count': 7, 'parent': 0, 'meta': {'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized', 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help', 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'post_tag': {}, 'post_format': {}, 'mentions': {}}, 'tags': {}, 'categories': {'Uncategorized': {'ID': 1, 'name': 'Uncategorized', 'slug': 'uncategorized', 'description': '', 'post_count': 7, 'parent': 0, 'meta': {'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized', 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/categories/slug:uncategorized/help', 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288'}}}}, 'attachments': {}, 'attachment_count': 0, 'metadata': [{'id': '50', 'key': 'jabber_published', 'value': '1673428261'}], 'meta': {'links': {'self': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11', 'help': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/help', 'site': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288', 'replies': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/replies/', 'likes': 'https://public-api.wordpress.com/rest/v1.1/sites/213857288/posts/11/likes/'}}, 'capabilities': {'publish_post': True, 'delete_post': True, 'edit_post': True}, 'other_URLs': {'permalink_URL': 'https://dummy15.wordpress.com/?p=11', 'suggested_slug': 'my-personal-post__trashed'}}, 'status_code': 200, 'success': True}
        delete_single_mock.return_value = response
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        url = reverse('wordpress_posts-delete-single-post', kwargs={"pk": 11})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_200_OK)

    @mock.patch('modules.django_wordpress.wordpress.services.WordpressService.WordpressService.delete_single_post')
    def test_delete_single_post_without_token(self, delete_single_mock):
        response = None
        delete_single_mock.return_value = response
        url = reverse('wordpress_posts-delete-single-post', kwargs={"pk": 11})
        responses = self.client.post(url, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
