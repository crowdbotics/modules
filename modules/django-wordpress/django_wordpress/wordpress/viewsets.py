import os

from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status

from .services.WordpressService import WordpressService


class WordpressViewSet(GenericViewSet):
    wordpress_service = WordpressService(base_url=os.getenv('WORDPRESS_BASE_URL', ""),
                                         client_id=os.getenv('WORDPRESS_CLIENT_ID', ""),
                                         client_secrets=os.getenv('WORDPRESS_CLIENT_SECRETS', ""),
                                         redirect_url=os.getenv("WORDPRESS_REDIRECT_URL", ""),
                                         wordpress_domain=os.getenv("WORDPRESS_DOMAIN", "")
                                         )

    @action(detail=False, methods=['post'], url_path='get-auth-token')
    def get_auth_token(self, request):
        code = request.META.get('HTTP_WORDPRESS_CODE')
        if code:
            response = self.wordpress_service.get_auth_token(wordpress_code=code)
            if response:
                return Response(data=response, status=status.HTTP_200_OK)
            return Response(data={"error": "Code Expire. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "errorCode": "CODE_NOT_FOUND",
                "message": "Wordpress Code not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='create-post')
    def create_post(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_post(access_token=access_token, request_body=request.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='edit-post')
    def edit_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.edit_post(access_token=access_token, request_body=request.data,
                                                        post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='get-multiple-post')
    def get_multiple_post(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = self.wordpress_service.get_multiple_posts(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='delete-single-post')
    def delete_single_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_single_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='delete-multiple-post')
    def delete_multiple_post(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_multiple_post(access_token=access_token, request_body=request.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='restore-post')
    def restore_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.restore_post(access_token=access_token, post_id=pk,
                                                           request_body=request.data
                                                           )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='get-list-of-likes')
    def get_list_of_likes(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_list_of_likes(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='like-post')
    def like_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.like_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='unlike-post')
    def unlike_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.unlike_post(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='get-list-of-post-subscribers')
    def get_list_of_likes(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_list_of_post_subscribers(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='get-multiple-users')
    def get_multiple_users(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = self.wordpress_service.get_multiple_users(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='update-user-details')
    def update_user_details(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.update_user_details(access_token=access_token,
                                                                  user_id=pk,
                                                                  request_body=request.data)

            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='delete-user')
    def delete_user(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_user(access_token=access_token,
                                                          user_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='delete-user')
    def get_rendered_shortcode_for_site(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_rendered_shortcode_for_site(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='get-active-inactive-widgets')
    def get_active_inactive_widgets(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_active_inactive_widgets(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='activate_widget')
    def activate_widget(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.activate_widget(access_token=access_token, request_body=request.data)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='deactivate_widget')
    def deactivate_widget(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.deactivate_widget(access_token=access_token, widget_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='get_single_comment')
    def get_single_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_single_comment(access_token=access_token, comment_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='edit_comment')
    def edit_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.edit_comment(access_token=access_token,
                                                           comment_id=pk,
                                                           request_data=request.data
                                                           )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='delete_comment')
    def delete_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_comment(access_token=access_token,
                                                             comment_id=pk,
                                                             )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='create-comment-on-post')
    def create_comment_on_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_comment_on_post(access_token=access_token,
                                                                     request_data=request.data,
                                                                     post_id=pk,
                                                                     )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='like-comment')
    def like_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.like_comment(access_token=access_token,
                                                           comment_id=pk
                                                           )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='unlike-comment')
    def unlike_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.unlike_comment(access_token=access_token,
                                                             comment_id=pk
                                                             )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_BAD_REQUEST)
