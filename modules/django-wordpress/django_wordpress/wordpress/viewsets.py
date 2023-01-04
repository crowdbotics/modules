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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='restore-post')
    def restore_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.restore_post(access_token=access_token, post_id=pk,
                                                           )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-rendered-shortcode-for-site')
    def get_rendered_shortcode_for_site(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = self.wordpress_service.get_rendered_shortcode_for_site(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit_comment')
    def edit_comment(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.edit_comment(access_token=access_token,
                                                           comment_id=pk,
                                                           request_body=request.data
                                                           )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='create-comment-on-post')
    def create_comment_on_post(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_comment_on_post(access_token=access_token,
                                                                     request_body=request.data,
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
            }, status=status.HTTP_404_NOT_FOUND)

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
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-list-of-site-categories')
    def get_list_of_site_categories(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_list_of_site_categories(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-category')
    def create_category(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_category(access_token=access_token,
                                                              request_body=request.data
                                                              )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit-category')
    def edit_category(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.edit_category(access_token=access_token,
                                                            request_body=request.data,
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
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_category(access_token=access_token,
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
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_list_of_site_tags(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-tag')
    def create_tag(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_tag(access_token=access_token,
                                                         request_body=request.data
                                                         )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='edit-tag')
    def edit_tag(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.edit_tag(access_token=access_token,
                                                       request_body=request.data,
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
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_tag(access_token=access_token,
                                                         tag_slug=pk
                                                         )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='follow_blog')
    def follow_blog(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.follow_blog(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='unfollow_blog')
    def unfollow_blog(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.unfollow_blog(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-freshly-pressed-posts')
    def get_freshly_pressed_posts(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            params = request.query_params.dict()
            response = self.wordpress_service.get_freshly_pressed_posts(access_token=access_token, params=params)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-list-of-insights')
    def get_list_of_insights(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.list_of_insights(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-raw-data-graph')
    def get_raw_data_graph(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_raw_data_graph(access_token=access_token,
                                                                 graph_slug=pk
                                                                 )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-default-reader-menu')
    def get_default_reader_menu(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_default_reader_menu(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get_feed_details')
    def get_feed_details(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_feed_details(access_token=access_token, feed_url_or_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-list-of-post-from-tag')
    def get_list_of_post_from_tag(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_list_of_post_from_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='subscribe-new-tag')
    def subscribe_new_tag(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.subscribe_new_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='unsubscribe-tag')
    def unsubscribe_tag(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.unsubscribe_tag(access_token=access_token, tag=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-site-stats')
    def get_site_stats(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_site_stats(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-site-stats-summary')
    def get_site_stats_summary(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_site_stats_summary(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='get-post-views')
    def get_post_views(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_post_views(access_token=access_token, post_id=pk)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='get-site-followers')
    def get_site_followers(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_site_followers(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-navigation-menu')
    def create_navigation_menu(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.create_navigation_menu(access_token=access_token,
                                                                     request_body=request.data
                                                                     )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='update-navigation-menu')
    def update_navigation_menu(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.update_navigation_menu(access_token=access_token,
                                                                     request_body=request.data,
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
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.get_all_navigation_menu(access_token=access_token)
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], url_path='delete-navigation-menu')
    def delete_navigation_menu(self, request, pk):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        if access_token:
            response = self.wordpress_service.delete_navigation_menu(access_token=access_token,
                                                                     menu_id=pk
                                                                     )
            return Response(data=response, status=response.get("status_code"))
        else:
            return Response({
                "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                "message": "Access token not found"
            }, status=status.HTTP_404_NOT_FOUND)
