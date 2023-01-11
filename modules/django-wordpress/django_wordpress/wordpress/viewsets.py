import os

from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status

from .services.WordpressService import WordpressService
from .serializers import ActivateWidgetsSerializer, CreatePostSerializer, CategoriesSerializer, CommentOnPostSerializer,\
    EditCommentSerializer, TagSerializer, DeleteMultiplePostSerializer, UpdateUserDetailsSerializer, MenuSerializer

wordpress_service = WordpressService(base_url=os.getenv('WORDPRESS_BASE_URL', ""),
                                     client_id=os.getenv('WORDPRESS_CLIENT_ID', ""),
                                     client_secrets=os.getenv('WORDPRESS_CLIENT_SECRETS', ""),
                                     redirect_url=os.getenv("WORDPRESS_REDIRECT_URL", ""),
                                     wordpress_domain=os.getenv("WORDPRESS_DOMAIN", "")
                                     )


class WordpressAuthViewSet(GenericViewSet):
    """
    WordpressAuth ViewSet provides the following functionality:

    - get_auth_token : Provide Auth Token to perform further Authentication
    """

    @action(detail=False, methods=['post'], url_path='get-auth-token')
    def get_auth_token(self, request):
        """
        Provide Auth Token to perform further Authentication
        WordPress Code Required
        """

        code = request.META.get('HTTP_WORDPRESS_CODE')
        if code:
            response = wordpress_service.get_auth_token(wordpress_code=code)
            if response:
                return Response(data=response, status=status.HTTP_200_OK)
            return Response(data={"error": "Code Expire. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "errorCode": "CODE_NOT_FOUND",
                "message": "Wordpress Code not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressPostsViewSet(GenericViewSet):
    """
    WordpressPosts ViewSet  provides the  following functionality:
    - create_post : Create a post on WordPress.
    - edit_post : Edit a created post on WordPress.
    - get_multiple_post : Get a list of matching posts.
    - delete_single_post : Delete a post. Note: If the trash is enabled, this request will send the post to the trash. A second request will permanently delete the post.
    - delete_multiple_post : Delete multiple posts. Note: If the trash is enabled, this request will send non-trashed posts to the trash. Trashed posts will be permanently deleted.
    - restore_post : Restore deleted Post.
    - get_list_of_likes : Get a list of the likes for a post.
    - like_post : Like a post.
    - Unlike_post : Unlike a post.
    """
    allowed_serializers = {
        "create_post": CreatePostSerializer,
        "edit_post": CreatePostSerializer,
        "delete_multiple_post": DeleteMultiplePostSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['post'], url_path='create-post')
    def create_post(self, request):
        """
        Create a post on WordPress.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.create_post(access_token=access_token, request_body=serializer.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit-post')
    def edit_post(self, request, pk):
        """
        Edit a post on WordPress.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/%24post_ID/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.edit_post(access_token=access_token, request_body=serializer.data,
                                                   post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-multiple-post')
    def get_multiple_post(self, request):
        """
        Get a list of matching posts.
        User can use optional query params. For details about query params visit the given link below
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = wordpress_service.get_multiple_posts(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-single-post')
    def delete_single_post(self, request, pk):
        """
         Delete a post. Note: If the trash is enabled, this request will send the post to the trash.
         A second request will permanently delete the post.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_single_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='delete-multiple-post')
    def delete_multiple_post(self, request):
        """
        Delete multiple posts. Note: If the trash is enabled, this request will send non-trashed posts to the trash.
        Trashed posts will be permanently deleted.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/delete/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.delete_multiple_post(access_token=access_token, request_body=serializer.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='restore-post')
    def restore_post(self, request, pk):
        """
        Restore posts.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.restore_post(access_token=access_token, post_id=pk,
                                                      )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-list-of-likes')
    def get_list_of_likes(self, request, pk):
        """
        Get a list of the likes for a post.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_likes(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='like-post')
    def like_post(self, request, pk):
        """
        Like a post.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.like_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='unlike-post')
    def unlike_post(self, request, pk):
        """
        Unlike a post.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.unlike_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-list-of-post-subscribers')
    def get_list_of_post_subscribers(self, request, pk):
        """
        Get a list of the specified post's subscribers.
        :param str pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_post_subscribers(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressUsersViewSet(GenericViewSet):
    """
    WordpressUsers ViewSet provides the following functionality:

    - get_multiple_users : List the users of a site.
    - update_user_details : Update details of a user of a site.
    - delete_user : Deletes or removes a user of a site.
    """
    allowed_serializers = {
        "update_user_details": UpdateUserDetailsSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='get-multiple-users')
    def get_multiple_users(self, request):
        """
        List the users of a site.
        User can use optional query params. For details about query params visit the given link below
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/users/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = wordpress_service.get_multiple_users(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='update-user-details')
    def update_user_details(self, request, pk):
        """
        Update details of a user of a site.
        :param str pk: User ID (required)
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/users/%24user_id/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.update_user_details(access_token=access_token,
                                                             user_id=pk,
                                                             request_body=serializer.data)

            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-user')
    def delete_user(self, request, pk):
        """
        Delete a User
        :param str pk: User ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_user(access_token=access_token,
                                                     user_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressSitesViewSet(GenericViewSet):
    """
    WordpressSites ViewSet provides the following functionality:

    - get_rendered_shortcode_for_site : Get a rendered shortcode for a site. Note: The current user must have publishing access.
    - get_active_inactive_widgets : Retrieve the active and inactive widgets for a site.
    - activate_widget : Activate a widget on a site.
    - deactivate_widget: Deactivate a widget on a site.
    """
    allowed_serializers = {
        "activate_widget": ActivateWidgetsSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='get-rendered-shortcode-for-site')
    def get_rendered_shortcode_for_site(self, request):
        """
        Get a rendered shortcode for a site. Note: The current user must have publishing access.
        User have to you required query params. For details about query params visit the given link below
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/shortcodes/render/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = wordpress_service.get_rendered_shortcode_for_site(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-active-inactive-widgets')
    def get_active_inactive_widgets(self, request):
        """
        Retrieve the active and inactive widgets for a site.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_active_inactive_widgets(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='activate_widget')
    def activate_widget(self, request):
        """
        Activate a widget on a site.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/widgets/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.activate_widget(access_token=access_token, request_body=serializer.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='deactivate_widget')
    def deactivate_widget(self, request, pk):
        """
        Deactivate a widget on a site.
        :param str pk: Widget ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.deactivate_widget(access_token=access_token, widget_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressCommentsViewSet(GenericViewSet):
    """
    WordpressComments ViewSet provides the following functionality:

    - get_single_comment : Get a single comment.
    - edit_comment : Edit a comment.
    - delete_comment : Delete a comment.
    - create_comment_on_post : Create a comment on a post.
    - like_comment : Like a comment.
    - unlike_comment : Unlike a comment.
    """
    allowed_serializers = {
        "edit_comment": EditCommentSerializer,
        "create_comment_on_post": CommentOnPostSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=True, methods=['get'], url_path='get_single_comment')
    def get_single_comment(self, request, pk):
        """
        Get a single comment.
        :param str pk: Comment ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_single_comment(access_token=access_token, comment_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit_comment')
    def edit_comment(self, request, pk):
        """
        Edit a comment
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/comments/%24comment_ID/
        :param str pk: Comment ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.edit_comment(access_token=access_token,
                                                      comment_id=pk,
                                                      request_body=serializer.data
                                                      )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete_comment')
    def delete_comment(self, request, pk):
        """
        Delete a comment
        :param str pk: Comment ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_comment(access_token=access_token,
                                                        comment_id=pk,
                                                        )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='create-comment-on-post')
    def create_comment_on_post(self, request, pk):
        """
        Creates a comment on post
        :param str pk: Post ID (required)
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/%24post_ID/replies/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.create_comment_on_post(access_token=access_token,
                                                                request_body=serializer.data,
                                                                post_id=pk,
                                                                )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='like-comment')
    def like_comment(self, request, pk):
        """
        Like a comment.
        :param str pk: Comment ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.like_comment(access_token=access_token,
                                                      comment_id=pk
                                                      )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='unlike-comment')
    def unlike_comment(self, request, pk):
        """
        Unlike a comment.
        :param str pk: Comment ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.unlike_comment(access_token=access_token,
                                                        comment_id=pk
                                                        )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressTaxonomyViewSet(GenericViewSet):
    """
    WordpressTaxonomy ViewSet provides the following functionality:

    - get_list_of_site_categories : Get a list of a site's categories.
    - create_category : Create a new category.
    - edit_category : Edit a new category.
    - delete_category : Delete a category.
    - get_list_of_site_tags : Get a list of a site's tags.
    - create_tag : Create a tag.
    - edit_tag : Edit a tag.
    - delete_tag : Delete a tag.
    """
    allowed_serializers = {
        "create_category": CategoriesSerializer,
        "edit_category": CategoriesSerializer,
        "create_tag": TagSerializer,
        "edit_tag": TagSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='get-list-of-site-categories')
    def get_list_of_site_categories(self, request):
        """
        Get a list of a site's categories.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_site_categories(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-category')
    def create_category(self, request):
        """
        Create a new category.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/categories/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.create_category(access_token=access_token,
                                                         request_body=serializer.data
                                                         )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit-category')
    def edit_category(self, request, pk):
        """
        Edit a category.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/categories/slug:%24category/
        :param str pk: Category Slug (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.edit_category(access_token=access_token,
                                                       request_body=serializer.data,
                                                       category_slug=pk
                                                       )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-category')
    def delete_category(self, request, pk):
        """
        Delete a category.
        :param str pk: Category Slug (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_category(access_token=access_token,
                                                         category_slug=pk
                                                         )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-list-of-site-tags')
    def get_list_of_site_tags(self, request):
        """
        Get a list of a site's tags.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_site_tags(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-tag')
    def create_tag(self, request):
        """
        Create a new Tag.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/tags/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.create_tag(access_token=access_token,
                                                    request_body=serializer.data
                                                    )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit-tag')
    def edit_tag(self, request, pk):
        """
        Edit a tag.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/tags/slug:%24tag/
        :param str pk: Tag Slug (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.edit_tag(access_token=access_token,
                                                  request_body=serializer.data,
                                                  tag_slug=pk
                                                  )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-tag')
    def delete_tag(self, request, pk):
        """
        Delete a tag.
        :param str pk: Tag Slug (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_tag(access_token=access_token,
                                                    tag_slug=pk
                                                    )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressFollowViewSet(GenericViewSet):
    """
    WordpressFollow ViewSet provides the following functionality:

    - follow_blog : Follow a blog.
    - unfollow_blog : Unfollow a blog.
    """

    @action(detail=False, methods=['post'], url_path='follow_blog')
    def follow_blog(self, request):
        """
        Follow a blog.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.follow_blog(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='unfollow_blog')
    def unfollow_blog(self, request):
        """
        Unfollow a blog.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.unfollow_blog(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressFreshlyPressedViewSet(GenericViewSet):
    """
    WordpressFreshly ViewSet provides the following functionality:

    - get_freshly_pressed_posts : Get a list of Freshly Pressed posts.
    """

    @action(detail=False, methods=['get'], url_path='get-freshly-pressed-posts')
    def get_freshly_pressed_posts(self, request):
        """
         Get a list of Freshly Pressed posts.
         User can use optional query params. For details about query params visit the given link below
         https://developer.wordpress.com/docs/api/1.1/get/freshly-pressed/
         """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = wordpress_service.get_freshly_pressed_posts(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressInsightsViewSet(GenericViewSet):
    """
    WordpressInsights ViewSet provides the following functionality:

    - get_list_of_insights : Get a list of stats/metrics/insights that the current user has access to.
    - get_raw_data_graph : Get raw data for a particular graph.
    """

    @action(detail=False, methods=['get'], url_path='get-list-of-insights')
    def get_list_of_insights(self, request):
        """
        Get a list of stats/metrics/insights that the current user has access to.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_insights(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-raw-data-graph')
    def get_raw_data_graph(self, request, pk):
        """
        Get raw data for a particular graph.
        :param pk: Insight Slug (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_raw_data_graph(access_token=access_token,
                                                            graph_slug=pk
                                                            )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressReaderViewSet(GenericViewSet):
    """
    WordpressReader ViewSet provides the following functionality:

    - get_default_reader_menu : Get default reader menu.
    - get_feed_details : Get details about a feed.
    - get_list_of_post_subscribers : Get a list of the specified post's subscribers.
    - get_list_of_post_from_tag : Get a list of posts from a tag.
    - subscribe_new_tag : Subscribe to a new tag.
    - unsubscribe_tag:  Unsubscribe from a tag.
    """

    @action(detail=False, methods=['get'], url_path='get-default-reader-menu')
    def get_default_reader_menu(self, request):
        """
        Get default reader menu.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_default_reader_menu(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get_feed_details')
    def get_feed_details(self, request, pk):
        """
        Get details about a feed.
        :param pk: Feed ID or URL (required)

        """
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_feed_details(access_token=access_token, feed_url_or_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-list-of-post-from-tag')
    def get_list_of_post_from_tag(self, request, pk):
        """
        Get a list of posts from a tag.
        :param pk: Tag Name (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_list_of_post_from_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='subscribe-new-tag')
    def subscribe_new_tag(self, request, pk):
        """
            Subscribe to a new tag.
        :param pk: Tag Name (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.subscribe_new_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='unsubscribe-tag')
    def unsubscribe_tag(self, request, pk):
        """
        Unsubscribe to a tag.
        :param pk: Tag Name (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.unsubscribe_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressStatsViewSet(GenericViewSet):
    """
    WordpressStats ViewSet provides the following functionality:

    - get_site_stats : Get a site's stats
    - get_site_stats_summary : View a site's summarized views, visitors, likes and comments
    - get_post_views : View a post's views
    - get_site_followers : View a site's followers
    """

    @action(detail=False, methods=['get'], url_path='get-site-stats')
    def get_site_stats(self, request):
        """
        Get a site's stats
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_site_stats(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-site-stats-summary')
    def get_site_stats_summary(self, request):
        """
        View a site's summarized views, visitors, likes and comments
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_site_stats_summary(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-post-views')
    def get_post_views(self, request, pk):
        """
        View a post's views
        :param pk: Post ID (required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_post_views(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-site-followers')
    def get_site_followers(self, request):
        """
        View a site's followers
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_site_followers(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)


class WordpressMenuViewSet(GenericViewSet):
    """
    WordpressAuth ViewSet provides the following functionality:

    - create_navigation_menu : Create a new navigation menu.
    - update_navigation_menu : Updates a navigation menu
    - get_all_navigation_menu : Get a list of all navigation menus.
    - delete_navigation_menu : Delete a navigation menu
    """
    allowed_serializers = {
        "create_navigation_menu": MenuSerializer,
        "update_navigation_menu": MenuSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['post'], url_path='create-navigation-menu')
    def create_navigation_menu(self, request):
        """
        Create a new navigation menu.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/menus/new/
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.create_navigation_menu(access_token=access_token,
                                                                request_body=serializer.data
                                                                )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='update-navigation-menu')
    def update_navigation_menu(self, request, pk):
        """
        Update a navigation menu.
        Required the request body. For details about request body visit the given link below
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/menus/%24menu_id/
        :param pk: Menu ID (Required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = wordpress_service.update_navigation_menu(access_token=access_token,
                                                                request_body=serializer.data,
                                                                menu_id=pk
                                                                )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-all-navigation-menu')
    def get_all_navigation_menu(self, request):
        """
        Get a list of all navigation menus.
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.get_all_navigation_menu(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-navigation-menu')
    def delete_navigation_menu(self, request, pk):
        """
        Delete a navigation menu
        :param pk: Menu ID (Required)
        """

        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = wordpress_service.delete_navigation_menu(access_token=access_token,
                                                                menu_id=pk
                                                                )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)
