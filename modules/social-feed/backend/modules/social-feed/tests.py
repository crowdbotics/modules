from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from six import BytesIO

from .models import Post, Follow, UpvotePost, LikeComment, PostComment, PostMedia, ReportPost, FollowRequest, \
    DownvotePost

User = get_user_model()


class CreatePostViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()

    def test_create_post(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/create-post/'
        data = {
            "caption": "demo"
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['caption'], 'demo')

    def test_create_post_with_media(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/create-post/'
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        media = SimpleUploadedFile('demo_image.png', image.getvalue())
        data = {
            "caption": "media demo",
            "media": media
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['caption'], 'media demo')

    def test_create_post_with_media_only(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/create-post/'
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        media = SimpleUploadedFile('demo_image.png', image.getvalue())
        data = {
            "media": media
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_post_without_authorization(self):
        url = '/modules/social-feed/create-post/'
        data = {
            "caption": "media demo",
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)


class MyFeedViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")

    def test_get_my_feed(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/my-feed/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['caption'], 'My profile')

    def test_get_my_feed_without_authorization(self):
        url = '/modules/social-feed/my-feed/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class MyProfileTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")

    def test_get_my_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/my-profile/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['posts'][0]['caption'], 'My profile')

    def test_get_my_profile_without_authorization(self):
        url = '/modules/social-feed/my-profile/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class GetProfileTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")

    def test_get_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('profile', kwargs={'pk': self.user.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['posts'][0]['caption'], 'My profile')

    def test_get_profile_with_invalid_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('profile', kwargs={'pk': 0})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_profile_without_authorization(self):
        url = reverse('profile', kwargs={'pk': 0})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class MyFollowersAndFollowingsViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.new_user = User.objects.create_user(username='david', email='david12@gmail.com', password='david123@')
        self.new_user_token = Token.objects.create(user=self.new_user)
        self.new_user_token.save()
        self.my_followers = Follow.objects.create(user=self.user, follow=self.new_user)

    def test_get_my_followers(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.new_user_token.key)
        url = '/modules/social-feed/my-followers/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['results'][0]['username'], 'john')

    def test_get_my_followers_without_authorization(self):
        url = '/modules/social-feed/my-followers/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_my_followings(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/my-following/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['results'][0]['username'], 'david')

    def test_get_my_followings_without_authorization(self):
        url = '/modules/social-feed/my-following/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class LikeAndUnlikePostsViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.new_user = User.objects.create_user(username='david', email='david12@gmail.com', password='david123@')
        self.new_user_token = Token.objects.create(user=self.new_user)
        # self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")

    def test_create_like_post(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        url = '/modules/social-feed/like-post/'
        data = {
            "post_id": create_post.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_like_post_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.new_user_token.key)
        url = '/modules/social-feed/like-post/'
        data = {
            "post_id": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_like_post_without_authorization(self):
        url = '/modules/social-feed/like-post/'
        data = {
            "post_id": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_unlike_post(self):
        create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        UpvotePost.objects.create(post=create_post, upvote_by=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/unlike-post/'
        data = {
            "post_id": create_post.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_unlike_post_without_authorization(self):
        url = '/modules/social-feed/unlike-post/'
        data = {
            "post_id": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_unlike_post_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.new_user_token.key)
        url = '/modules/social-feed/unlike-post/'
        data = {
            "post_id": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


class LikeCommentAndUnlikeCommentViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.create_comment = PostComment.objects.create(user=self.user, comment="Awesome Activity",
                                                         post=self.create_post)

    def test_create_like_comment(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/like-comment/'
        data = {
            "comment_id": self.create_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_like_comment_without_authorization(self):
        url = '/modules/social-feed/like-comment/'
        data = {
            "comment_id": self.create_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_like_comment_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/like-comment/'
        data = {
            "comment_id": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_unlike_comment(self):
        LikeComment.objects.create(liked_by=self.user, comment=self.create_comment)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/unlike-comment/'
        data = {
            "comment_id": self.create_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_unlike_comment_without_authorization(self):
        url = '/modules/social-feed/unlike-comment/'
        data = {
            "comment_id": self.create_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_unlike_comment_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/unlike-comment/'
        data = {
            "comment_id": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


class ReportPostViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.new_user = User.objects.create_user(username='david', email='david12@gmail.com', password='john123@')
        self.new_user_token = Token.objects.create(user=self.new_user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")

    def test_create_report_on_post(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/report-post/'
        data = {
            "post": self.create_post.id,
            "reason": "For abusing"
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_report_on_post_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/report-post/'
        data = {
            "post": "",
            "reason": "For abusing"
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_report_on_post_without_authorization(self):
        url = '/modules/social-feed/report-post/'
        data = {
            "post": self.create_post.id,
            "reason": "For abusing"
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class PostCommentViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.create_comment = PostComment.objects.create(user=self.user, comment="Awesome Activity",
                                                         post=self.create_post)
        self.ref_comment = PostComment.objects.create(user=self.user, comment="Awesome Activity",
                                                      post=self.create_post, ref_comment=self.create_comment)

    def test_create_post_comment(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/post-comment/'
        data = {
            "post": self.create_post.id,
            "comment": "Nice picture",
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['comment'], 'Nice picture')

    def test_create_post_comment_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/post-comment/'
        data = {}
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_post_comment_with_ref_comment(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/post-comment/'
        data = {
            "post": self.create_post.id,
            "comment": "Nice picture",
            "ref_comment": self.ref_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['comment'], 'Nice picture')

    def test_create_post_comment_without_authorization(self):
        url = '/modules/social-feed/post-comment/'
        data = {
            "post": self.create_post.id,
            "comment": "Nice picture",
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_comment(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/delete-comment/'
        data = {
            "comment_id": self.create_comment.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_delete_comment_with_invalid_comment_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/social-feed/delete-comment/'
        data = {
            "comment_id": 5
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_comment_without_authorization(self):
        url = '/modules/social-feed/delete-comment/'
        data = {
            "comment_id": 5
        }
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)


class FollowAndUnfollowView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.new_user = User.objects.create_user(username='david', email='david12@gmail.com', password='david123@')
        self.new_user_token = Token.objects.create(user=self.new_user)

    def test_follow_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('follow', kwargs={"pk": self.user.id})
        response = self.client.post(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_follow_user_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('follow', kwargs={"pk": 5})
        response = self.client.post(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unfollow_user(self):
        Follow.objects.create(user=self.user, follow=self.new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('unfollow', kwargs={"pk": self.new_user.id})
        response = self.client.post(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_unfollow_user_with_invalid_data(self):
        Follow.objects.create(user=self.user, follow=self.new_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('unfollow', kwargs={"pk": 89})
        response = self.client.post(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_404_NOT_FOUND)


class PostViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own pictur")

    def test_get_post_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('post-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['caption'], 'My profile')

    def test_get_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('post-detail', kwargs={'pk': self.create_post.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['caption'], 'My profile')

    def test_delete_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('post-detail', kwargs={'pk': self.create_post.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class PostMediaViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        media = SimpleUploadedFile('demo_image.png', image.getvalue())
        self.post_media = PostMedia.objects.create(post=self.create_post, image=media)

    def test_get_postmedia_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postmedia-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['post'], self.post_media.id)

    def test_get_postmedia_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postmedia-detail', kwargs={'pk': self.post_media.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['post'], self.post_media.id)

    def test_delete_postmedia_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postmedia-detail', kwargs={'pk': self.post_media.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class ReportPostViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.report_post = ReportPost.objects.create(reported_by=self.user, post=self.create_post, reason="abusing")

    def test_get_report_post_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('reportpost-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['reason'], 'abusing')

    def test_get_report_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('reportpost-detail', kwargs={'pk': self.report_post.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['reason'], 'abusing')

    def test_delete_report_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('reportpost-detail', kwargs={'pk': self.report_post.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class FollowRequestViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.new_user = User.objects.create_user(username='david', email='david12@gmail.com', password='david123@')
        self.new_user_token = Token.objects.create(user=self.new_user)
        self.follow_request = FollowRequest.objects.create(generated_by=self.user, generated_for=self.new_user)

    def test_get_follow_request_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('followrequest-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['generated_by'], self.follow_request.id)

    def test_get_follow_request_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('followrequest-detail', kwargs={'pk': self.follow_request.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['generated_by'], self.follow_request.id)

    def test_delete_follow_request_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('followrequest-detail', kwargs={'pk': self.follow_request.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class PostCommentViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.create_comment = PostComment.objects.create(user=self.user, comment="Awesome Activity",
                                                         post=self.create_post)

    def test_get_post_comment_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postcomment-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['comment'], 'Awesome Activity')

    def test_get_post_comment_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postcomment-detail', kwargs={'pk': self.create_comment.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['comment'], 'Awesome Activity')

    def test_delete_post_comment_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('postcomment-detail', kwargs={'pk': self.create_comment.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class LikeCommentViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.create_comment = PostComment.objects.create(user=self.user, comment="Awesome Activity",
                                                         post=self.create_post)
        self.liked_comment = LikeComment.objects.create(liked_by=self.user, comment=self.create_comment)

    def test_get_like_comment_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('likecomment-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['comment'], self.liked_comment.id)

    def test_get_like_comment_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('likecomment-detail', kwargs={'pk': self.liked_comment.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['comment'], self.liked_comment.id)

    def test_delete_like_comment_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('likecomment-detail', kwargs={'pk': self.liked_comment.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class UpVotePostViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.upvote_post = UpvotePost.objects.create(post=self.create_post, upvote_by=self.user)

    def test_get_upvote_post_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('upvotepost-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['upvote_by'], self.upvote_post.id)

    def test_get_upvote_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('upvotepost-detail', kwargs={'pk': self.upvote_post.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['upvote_by'], self.upvote_post.id)

    def test_delete_upvote_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('upvotepost-detail', kwargs={'pk': self.upvote_post.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)


class DownVotePostViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.create_post = Post.objects.create(user=self.user, caption="My profile", description="My own picture")
        self.down_vote_post = DownvotePost.objects.create(post=self.create_post, downvote_by=self.user)

    def test_get_down_vote_post_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('downvotepost-list')
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data[0]['downvote_by'], self.down_vote_post.id)

    def test_get_down_vote_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('downvotepost-detail', kwargs={'pk': self.down_vote_post.id})
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['downvote_by'], self.down_vote_post.id)

    def test_delete_down_vote_post_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = reverse('downvotepost-detail', kwargs={'pk': self.down_vote_post.id})
        response = self.client.delete(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
