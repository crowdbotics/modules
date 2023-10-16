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
        Provide Auth Token to perform further Authentication. \n
        WordPress code is required in the "Authorization" key.
        :headers : wordpress-code(required)
        :return : access_token(Bearer)
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
    - create_post : Create a post on WordPress. \n
    - edit_post : Edit a created post on WordPress. \n
    - get_multiple_post : Get a list of matching posts. \n
    - delete_single_post : Delete a post (Note: If the trash is enabled, this request will send the post to the trash. \n A second request will permanently delete the post). \n
    - delete_multiple_post : Delete multiple posts (Note: If the trash is enabled, this request will send non-trashed posts to the trash. \n Trashed posts will be permanently deleted). \n
    - restore_post : Restore deleted Post. \n
    - get_list_of_likes : Get a list of the likes for a post. \n
    - like_post : Like a post. \n
    - Unlike_post : Unlike a post. \n
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
        Create a post on WordPress. \n
        :body params : For details about request body(date, title, content,...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/new/   \n
        :Authorization Token : access_token(required)
        :return : Created post with ID and details
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
        :body params : For details about request body(date, title, content,...) visit serializers or the given link below). \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/%24post_ID/  \n
        :Authorization Token : access_token(required)
        :return : Edited post with ID and details
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
        Get a list of matching posts. \n
        :query params optional : For details about query params visit the given link below \n
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/  \n
        :Authorization Token : access_token(required)
        :return : List  of multiple posts with details
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
         Delete a post (Note: If the trash is enabled, this request will send the post to the trash). \n
         A second request will permanently delete the post. \n
        :path_param str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Details of deleted post
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
        Delete multiple posts (Note: If the trash is enabled, this request will send non-trashed posts to the trash). \n
        Trashed posts will be permanently deleted. \n
        :body params : For details about request body(context, preety, ...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/delete/  \n
        :Authorization Token : access_token(required)
        :return : A result with empty list
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
        Restore posts. \n
        :path param str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : A restored post with details
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
        Get a list of the likes for a post. \n
        :path param str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Details about likes of post
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
        Like a post. \n
        :path params str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Liked post with details
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
        Unlike a post. \n
        :path params str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Unliked post with details
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
        Get a list of the specified post's subscribers. \n
        :path params str pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Detail about list of post subscribers
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
    WordpressUsers ViewSet provides the following functionality: \n

    - get_multiple_users : List the users of a site. \n
    - update_user_details : Update details of a user of a site. \n
    - delete_user : Deletes or removes a user of a site. \n

    """
    allowed_serializers = {
        "update_user_details": UpdateUserDetailsSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='get-multiple-users')
    def get_multiple_users(self, request):
        """
        List the users of a site. \n
        query params optional : For details about query params(context, number, ..) visit serializers or the given link below. \n
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/users/  \n
        :Authorization Token : access_token(required)
        :return : List of multiple users with details
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
        Update details of a user of a site. \n
        :param str pk: User ID (required) \n
        :body_params : For details about request body(Id, login, email,...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/users/%24user_id/  \n
        :Authorization Token : access_token(required)
        :return : Updated user details
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
        Delete a User. \n
        :path params str pk: User ID (required).  \n
        :Authorization Token : access_token(required)
        :return : Deleted user details
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
    WordpressSites ViewSet provides the following functionality: \n

    - get_rendered_shortcode_for_site : Get a rendered shortcode for a site. Note: The current user must have publishing access. \n
    - get_active_inactive_widgets : Retrieve the active and inactive widgets for a site. \n
    - activate_widget : Activate a widget on a site. \n
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
        Get a rendered shortcode for a site (Note: The current user must have publishing access). \n
        query params : For details about query params visit the given link below \n
        https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/shortcodes/render/  \n
        :Authorization Token : access_token(required)
        :return : Rendered shortcode for site with details
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
        Retrieve the active and inactive widgets for a site.  \n
        :Authorization Token : access_token(required)
        :return : A list of active and inactive widgets with details
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

    @action(detail=False, methods=['post'], url_path='activate-widget')
    def activate_widget(self, request):
        """
        Activate a widget on a site. \n
        :body params : For details about request body(id_base, position, ...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/widgets/new/  \n
        :Authorization Token : access_token(required)
        :return : Details about activated widgets
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

    @action(detail=True, methods=['post'], url_path='deactivate-widget')
    def deactivate_widget(self, request, pk):
        """
        Deactivate a widget on a site. \n
        :path param str pk: Widget ID (required)  \n
        :Authorization Token : access_token(required)
        :return : Details about deactivated widgets
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
    WordpressComments ViewSet provides the following functionality: \n

    - get_single_comment : Get a single comment. \n
    - edit_comment : Edit a comment. \n
    - delete_comment : Delete a comment. \n
    - create_comment_on_post : Create a comment on a post. \n
    - like_comment : Like a comment. \n
    - unlike_comment : Unlike a comment.
    """
    allowed_serializers = {
        "edit_comment": EditCommentSerializer,
        "create_comment_on_post": CommentOnPostSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=True, methods=['get'], url_path='get-single-comment')
    def get_single_comment(self, request, pk):
        """
        Get a single comment. \n
        :path param str pk: Comment ID (required)  \n
        :Authorization Token : access_token(required)
        :return : Details about single comment
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

    @action(detail=True, methods=['post'], url_path='edit-comment')
    def edit_comment(self, request, pk):
        """
        Edit a comment \n
        :body params : For details about request body(author, author_email, author_url,...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/comments/%24comment_ID/  \n
        :path param str pk: Comment ID (required)  \n
        :Authorization Token : access_token(required)
        :return : Edited comment with details
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

    @action(detail=True, methods=['post'], url_path='delete-comment')
    def delete_comment(self, request, pk):
        """
        Delete a comment \n
        :path param str pk: Comment ID (required) \n
        :Authorization Token : access_token(required)
        :return : Details about deleted comment
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
        Creates a comment on post \n
        :path param str pk: Post ID (required) \n
        :body params : For details about request body(content) visit the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/%24post_ID/replies/new/  \n
        :Authorization Token : access_token(required)
        :return : Created comment on post with details
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
        Like a comment. \n
        :path param str pk: Comment ID (required)  \n
        :Authorization Token : access_token(required)
        :return : Details about liked comment
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
        Unlike a comment. \n
        :path param str pk: Comment ID (required) \n
        :Authorization Token : access_token(required)
        :return : Details about unliked comment
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
    WordpressTaxonomy ViewSet provides the following functionality: \n

    - get_list_of_site_categories : Get a list of a site's categories. \n
    - create_category : Create a new category. \n
    - edit_category : Edit a new category. \n
    - delete_category : Delete a category. \n
    - get_list_of_site_tags : Get a list of a site's tags. \n
    - create_tag : Create a tag. \n
    - edit_tag : Edit a tag. \n
    - delete_tag : Delete a tag. \n
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
        Get a list of a site's categories. \n
        :Authorization Token : access_token(required)
        :return : List of site categories with details
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
        Create a new category. \n
        :body params : For details about request body(name, description,...) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/categories/new/  \n
        :Authorization Token : access_token(required)
        :return : Created category with ID and details
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
        Edit a category. \n
        :body params : For details about request body(name, description,...) visit serializers or the given link below). \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/categories/slug:%24category/  \n
        :path param str pk: Category Slug (required)  \n
        :Authorization Token : access_token(required)
        :return : Edited category with details
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
        Delete a category. \n
        :path param str pk: Category Slug (required)  \n
        :Authorization Token : access_token(required)
        :return : Details about deleted comment
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
        Get a list of a site's tags. \n
        :Authorization Token : access_token(required)
        :return : List of site tags with details
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
        Create a new Tag. \n
        :body params : For details about request body(name and description) visit serializers or the given link below \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/tags/new/  \n
        :Authorization Token : access_token(required)
        :return : Created tag with ID and details
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
        Edit a tag. \n
        :body params : For details about request body(name and description) visit serializers or the given link below. \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/tags/slug:%24tag/  \n
        :path param str pk: Tag Slug (required)  \n
        :Authorization Token : access_token(required)
        :return : Edited tag with details
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
        Delete a tag. \n
        :path param str pk: Tag Slug (required) \n
        :Authorization Token : access_token(required)
        :return : Details about deleted tag
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
    WordpressFollow ViewSet provides the following functionality: \n

    - follow_blog : Follow a blog. \n
    - unfollow_blog : Unfollow a blog.
    """

    @action(detail=False, methods=['post'], url_path='follow-blog')
    def follow_blog(self, request):
        """
        Follow a blog.  \n
        :Authorization Token : access_token(required)
        :return : Followed blog with details
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

    @action(detail=False, methods=['post'], url_path='unfollow-blog')
    def unfollow_blog(self, request):
        """
        Unfollow a blog.  \n
        :Authorization Token : access_token(required)
        :return : Unfollowed blog with details
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
    WordpressFreshly ViewSet provides the following functionality: \n

    - get_freshly_pressed_posts : Get a list of Freshly Pressed posts.
    """

    @action(detail=False, methods=['get'], url_path='get-freshly-pressed-posts')
    def get_freshly_pressed_posts(self, request):
        """
         Get a list of Freshly Pressed posts. \n
         :query params optional : For details about query params visit the given link below \n
         https://developer.wordpress.com/docs/api/1.1/get/freshly-pressed/  \n
         :Authorization Token : access_token(required)
         :return : List of freshly pressed posts
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
    WordpressInsights ViewSet provides the following functionality: \n

    - get_list_of_insights : Get a list of stats/metrics/insights that the current user has access to. \n
    - get_raw_data_graph : Get raw data for a particular graph. \n
    """

    @action(detail=False, methods=['get'], url_path='get-list-of-insights')
    def get_list_of_insights(self, request):
        """
        Get a list of stats/metrics/insights that the current user has access to. \n
        :Authorization Token : access_token(required)
        :return : List of insights with details
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
        Get raw data for a particular graph. \n
        :param pk: Insight Slug (required) \n
        :Authorization Token : access_token(required)
        :return : Details of specific raw data graph
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
    WordpressReader ViewSet provides the following functionality: \n

    - get_default_reader_menu : Get default reader menu. \n
    - get_feed_details : Get details about a feed. \n
    - get_list_of_post_subscribers : Get a list of the specified post's subscribers. \n
    - get_list_of_post_from_tag : Get a list of posts from a tag. \n
    - subscribe_new_tag : Subscribe to a new tag. \n
    - unsubscribe_tag:  Unsubscribe from a tag.
    """

    @action(detail=False, methods=['get'], url_path='get-default-reader-menu')
    def get_default_reader_menu(self, request):
        """
        Get default reader menu. \n
        :Authorization Token : access_token(required)
        :return : Details about default reader menu
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

    @action(detail=True, methods=['get'], url_path='get-feed-details')
    def get_feed_details(self, request, pk):
        """
        Get details about a feed. \n
        :param pk: Feed ID or URL (required) \n
        :Authorization Token : access_token(required)
        :return : Specific feed details
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
        Get a list of posts from a tag. \n
        :param pk: Tag Name (required) \n
        :Authorization Token : access_token(required)
        :return : List of post from specific tag
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
        Subscribe to a new tag. \n
        :path param pk: Tag Name (required) \n
        :Authorization Token : access_token(required)
        :return : Subscribed tag with ID and details
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
        Unsubscribe to a tag. \n
        :path param pk: Tag Name (required) \n
        :Authorization Token : access_token(required)
        :return : Unsubscribed tag with details
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
    WordpressStats ViewSet provides the following functionality: \n

    - get_site_stats : Get a site's stats \n
    - get_site_stats_summary : View a site's summarized views, visitors, likes and comments \n
    - get_post_views : View a post's views \n
    - get_site_followers : View a site's followers
    """

    @action(detail=False, methods=['get'], url_path='get-site-stats')
    def get_site_stats(self, request):
        """
        Get a site's stats \n
        :Authorization Token : access_token(required)
        :return : Site stats with details
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
        View a site's summarized views, visitors, likes and comments \n
        :Authorization Token : access_token(required)
        :return : Site stats summary with details
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
        View a post's views \n
        :param pk: Post ID (required) \n
        :Authorization Token : access_token(required)
        :return : Details about post views
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
        View a site's followers \n
        :Authorization Token : access_token(required)
        :return : Site followers with details
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
    WordpressAuth ViewSet provides the following functionality: \n

    - create_navigation_menu : Create a new navigation menu. \n
    - update_navigation_menu : Updates a navigation menu \n
    - get_all_navigation_menu : Get a list of all navigation menus. \n
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
        Create a new navigation menu. \n
        :body params : For details about request body(name) visit serializers or the given link below. \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/menus/new/  \n
        :Authorization Token : access_token(required)
        :return : Created navigation menu with ID abd details
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
        Update a navigation menu. \n
        :body params : For details about request body(name) visit serializers or the given link below. \n
        https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/menus/%24menu_id/  \n
        :path param pk: Menu ID (Required) \n
        :Authorization Token : access_token(required)
        :return : Updated navigation menu with details
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
        Get a list of all navigation menus. \n
        :Authorization Token : access_token(required)
        :return : List of navigation menu with details
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
        Delete a navigation menu \n
        :path param pk: Menu ID (Required) \n
        :Authorization Token : access_token(required)
        :return : Deleted navigation menu details
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
