from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Comment, LikeOnComment
from .serializers import CommentSerializer, LikeOnCommentSerializer

User = get_user_model()


class CommentTestCases(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.parent_comment = Comment.objects.create(user=self.user, comment='large', item_uuid='shirt')
        self.comments = Comment.objects.create(user=self.user, comment='small', item_uuid='shirts',
                                               parent_comment=self.parent_comment)
        self.comments.save()
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        self.serializer = CommentSerializer(instance=self.parent_comment)

    def test_create_comment(self):
        url = reverse('comments-list')
        data = {
            "item_uuid": "product",
            "comment": "appreciated"
        }
        serializer = CommentSerializer(data=data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(len(response.data), 7)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.data['comment'], data['comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_comment_with_parent_comment(self):
        url = reverse('comments-list')
        data = {
            "item_uuid": "product",
            "comment": "appreciated",
            "parent_comment": self.parent_comment.id
        }
        serializer = CommentSerializer(data=data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(len(response.data), 7)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.data['parent_comment'], data['parent_comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_comment_without_data(self):
        url = reverse('comments-list')
        serializer = CommentSerializer(data={})
        response = self.client.post(url, format='json')
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_list_comment(self):
        url = reverse('comments-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_with_parent_param(self):
        url = reverse('comments-list')
        params = {"parent": self.comments.id}
        response = self.client.get(url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_with_item_param(self):
        url = reverse('comments-list')
        params = {"item_uuid": "shirt"}
        response = self.client.get(url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_with_item_uuid_and_parent_param(self):
        url = reverse('comments-list')
        params = {"item_uuid": "shirt", "parent": self.comments.id}
        response = self.client.get(url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_with_null_parent_param(self):
        url = reverse('comments-list')
        params = {"parent": ""}
        response = self.client.get(url, **params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_comment(self):
        url = reverse('comments-detail', kwargs={"pk": self.parent_comment.id})
        data = {
            "item_uuid": "products",
            "comment": "acceptable",
        }
        serializer = CommentSerializer(data=data)
        response = self.client.put(url, data, format='json')
        self.assertEqual(len(response.data), 7)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.data['item_uuid'], data['item_uuid'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_comment(self):
        url = reverse('comments-detail', kwargs={"pk": self.parent_comment.id})
        data = {
            "comment": "NOt acceptable",
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(len(response.data), 7)
        self.assertEqual(response.data['comment'], data['comment'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_comment(self):
        url = reverse('comments-detail', kwargs={"pk": self.parent_comment.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_str_is_equal_to_comment_title(self):
        """
        Method `__str__` should be equal to field `title`
        """
        comments = Comment.objects.get(pk=1)
        self.assertEqual(str(comments), comments.comment)


class LikeOnCommentTestCase(APITestCase):

    def setUp(self):
        self.comment_user = User.objects.create_user(username='david', email='david12@gmail.com', password='david123@')
        self.comment = Comment.objects.create(user=self.comment_user, comment='large', item_uuid='shirt')
        self.comment.save()
        self.comment_user_token = Token.objects.create(user=self.comment_user)
        self.comment_user_token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.comment_user_token.key)

    def test_like_on_comment(self):
        url = reverse('comments-like-list')
        data = {
            'comment': self.comment.id
        }
        serializer = LikeOnCommentSerializer(data=data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['comment'], data['comment'])
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_like_comment_without_data(self):
        url = reverse('comments-like-list')
        response = self.client.post(url, format='json')
        serializer = LikeOnCommentSerializer(data={})
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unlike_on_comment(self):
        url = reverse('comments-like-list')
        data = {
            'comment': self.comment.id
        }
        response = self.client.post(url, data, format='json')
        again_response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(again_response.status_code, status.HTTP_200_OK)

    def test_model_str_title(self):
        """
               Method `__str__` should be equal to field `title`
        """
        comments = LikeOnComment.objects.create(comment=self.comment, user=self.comment_user)
        self.assertEqual(str(comments), comments.comment.comment)
