import requests


class WordpressBase:
    def __init__(self, base_url, client_id, client_secrets, redirect_url, wordpress_domain):
        self.WORDPRESS_BASE_URL = base_url
        self.WORDPRESS_CLIENT_ID = client_id
        self.WORDPRESS_CLIENT_SECRETS = client_secrets
        self.WORDPRESS_REDIRECT_URL = redirect_url
        self.WORDPRESS_DOMAIN = wordpress_domain

    def get_auth_token(self, wordpress_code):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/oauth2/token"

            payload = {
                "client_id": self.WORDPRESS_CLIENT_ID,
                "client_secret": self.WORDPRESS_CLIENT_SECRETS,
                "redirect_uri": self.WORDPRESS_REDIRECT_URL,
                "code": wordpress_code,
                "grant_type": 'authorization_code',
            }

            response = requests.post(url=url, data=payload)
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            return e.args

    def _api_call(self, request_type, url, access_token=None, payload=None, params=None):
        try:
            headers = {"Authorization": f"{access_token}"}
            response = requests.request(request_type, url, headers=headers, data=payload, params=params)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": response, "status_code": response.status_code, "success": True}
            return {"data": response.json(), "status_code": response.status_code, "success": True}

        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class WordpressService(WordpressBase):

    def create_post(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def get_single_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def edit_post(self, access_token, request_body, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def get_multiple_posts(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def delete_single_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def delete_multiple_post(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def restore_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/restore"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_likes(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/likes/"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def like_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/likes/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def unlike_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/likes/mine/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_post_subscribers(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/subscribers/"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_multiple_users(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/users"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def update_user_details(self, access_token, user_id, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/users/{user_id}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def delete_user(self, access_token, user_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/users/{user_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_rendered_shortcode_for_site(self, access_token, params):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/shortcodes/render"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def get_active_inactive_widgets(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/widgets"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def activate_widget(self, access_token, request_body=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/widgets/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def deactivate_widget(self, access_token, widget_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/widgets/widget:{widget_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_single_comment(self, access_token, comment_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/comments/{comment_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def edit_comment(self, access_token, comment_id, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/comments/{comment_id}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      params=request_body
                                      )
            return response
        except Exception as e:
            return e

    def delete_comment(self, access_token, comment_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/comments/{comment_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def create_comment_on_post(self, access_token, request_body, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/replies/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def like_comment(self, access_token, comment_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/comments/{comment_id}/likes/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def unlike_comment(self, access_token, comment_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/comments/{comment_id}" \
                  f"/likes/mine/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_site_categories(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/categories"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def create_category(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/categories/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def edit_category(self, access_token, category_slug, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/categories/slug:{category_slug}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def delete_category(self, access_token, category_slug):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}" \
                  f"/categories/slug:{category_slug}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_site_tags(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/tags"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def create_tag(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/tags/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def edit_tag(self, access_token, tag_slug, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/tags/slug:{tag_slug}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def delete_tag(self, access_token, tag_slug):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}" \
                  f"/tags/slug:{tag_slug}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def follow_blog(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/follows/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def unfollow_blog(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/follows/mine/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_freshly_pressed_posts(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/freshly-pressed/"
            response = self._api_call(access_token=access_token, request_type='GET',
                                      url=url,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_insights(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/insights"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def get_raw_data_graph(self, access_token, graph_slug):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/insights/slug:{graph_slug}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_default_reader_menu(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/read/menu/"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_feed_details(self, access_token, feed_url_or_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/read/feed/{feed_url_or_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_single_post_in_reader(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.2/read/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_list_of_post_from_tag(self, access_token, tag):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/read/tags/{tag}/posts"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def subscribe_new_tag(self, access_token, tag):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/read/tags/{tag}/mine/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def unsubscribe_tag(self, access_token, tag):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/read/tags/{tag}/mine/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_site_stats(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/stats"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_site_stats_summary(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/stats/summary"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_post_views(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/stats/post/{post_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_site_followers(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/stats/followers"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def create_navigation_menu(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/menus/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def update_navigation_menu(self, access_token, request_body, menu_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/menus/{menu_id}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def get_single_navigation_menu(self, access_token, menu_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/menus/{menu_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def get_all_navigation_menu(self, access_token):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/menus"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def delete_navigation_menu(self, access_token, menu_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/menus/{menu_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

